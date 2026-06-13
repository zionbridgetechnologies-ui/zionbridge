const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

// Initialize Supabase Client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️ Supabase URL or Service Role Key is missing from environment variables!');
}

const supabaseClient = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false
  }
});

// Helper to wrap database records with Mongoose-like properties and methods
function wrapDoc(table, doc, excludeField) {
  if (!doc) return doc;
  
  // Clone document to avoid modifying the original database result
  const wrapped = { ...doc };
  wrapped._id = doc.id; // Map UUID id to Mongoose's _id

  // Handle populated jobId if it exists and is an object
  if (wrapped.jobId && typeof wrapped.jobId === 'object') {
    wrapped.jobId._id = wrapped.jobId.id;
  }

  // Handle field exclusion (like -password select)
  if (excludeField && excludeField in wrapped) {
    delete wrapped[excludeField];
  }

  // Add schema-specific instance methods
  if (table === 'admins') {
    wrapped.comparePassword = async function(pwd) {
      return bcrypt.compare(pwd, this.password);
    };
    
    wrapped.save = async function() {
      let pwd = this.password;
      // If the password was updated to a plain text password, hash it before saving
      if (pwd && !pwd.startsWith('$2a$') && !pwd.startsWith('$2b$')) {
        pwd = await bcrypt.hash(pwd, 12);
      }
      
      const { data, error } = await supabaseClient
        .from('admins')
        .update({
          name: this.name,
          email: this.email ? this.email.toLowerCase() : undefined,
          password: pwd,
          role: this.role
        })
        .eq('id', this.id)
        .select()
        .single();
        
      if (error) throw error;
      Object.assign(this, wrapDoc('admins', data, excludeField));
      return this;
    };
  }
  
  return wrapped;
}

function wrapDocs(table, docs, excludeField) {
  if (!docs) return docs;
  if (Array.isArray(docs)) {
    return docs.map(d => wrapDoc(table, d, excludeField));
  }
  return wrapDoc(table, docs, excludeField);
}

// Chainable query builder emulating Mongoose's query API
class SupabaseQuery {
  constructor(table, filter = {}, single = false) {
    this.table = table;
    this.filter = filter;
    this.single = single;
    this._sorts = [];
    this._limit = null;
    this._skip = null;
    this._populate = null;
    this._select = '*';
    this._exclude = null;
  }

  select(fields) {
    if (fields) {
      if (fields.startsWith('-')) {
        this._exclude = fields.substring(1).trim();
      } else {
        this._select = fields.split(' ').join(',');
      }
    }
    return this;
  }

  sort(sortObj) {
    if (sortObj) {
      for (const [key, val] of Object.entries(sortObj)) {
        const ascending = val === 1 || val === 'asc' || val === 'ascending';
        this._sorts.push({ column: key, ascending });
      }
    }
    return this;
  }

  skip(val) {
    this._skip = val;
    return this;
  }

  limit(val) {
    this._limit = val;
    return this;
  }

  populate(path, fields) {
    this._populate = { path, fields };
    return this;
  }

  async exec() {
    let selectQuery = this._select;
    // Map Mongoose populate to Postgres foreign key join
    if (this._populate && this._populate.path === 'jobId') {
      const popFields = this._populate.fields ? this._populate.fields.split(' ').join(',') : '*';
      selectQuery = `*, jobId:jobs(${popFields})`;
    }

    let query = supabaseClient.from(this.table).select(selectQuery);

    if (this.filter) {
      for (let [key, val] of Object.entries(this.filter)) {
        if (val === undefined) continue;
        if (key === '_id') key = 'id';
        query = query.eq(key, val);
      }
    }

    if (this._sorts.length > 0) {
      for (const s of this._sorts) {
        query = query.order(s.column, { ascending: s.ascending });
      }
    }

    if (this._skip !== null || this._limit !== null) {
      const from = this._skip || 0;
      const to = this._limit ? from + this._limit - 1 : undefined;
      query = query.range(from, to);
    }

    if (this.single) {
      const { data, error } = await query.maybeSingle();
      if (error) throw error;
      return wrapDoc(this.table, data, this._exclude);
    } else {
      const { data, error } = await query;
      if (error) throw error;
      return wrapDocs(this.table, data, this._exclude);
    }
  }

  then(resolve, reject) {
    this.exec().then(resolve, reject);
  }
}

// Model class containing static-like CRUD operations
class Model {
  constructor(table) {
    this.table = table;
  }

  find(filter = {}) {
    return new SupabaseQuery(this.table, filter, false);
  }

  findOne(filter = {}) {
    return new SupabaseQuery(this.table, filter, true);
  }

  findById(id) {
    return new SupabaseQuery(this.table, { id }, true);
  }

  async findByIdAndUpdate(id, body, options = {}) {
    const updateBody = { ...body };
    delete updateBody._id;
    delete updateBody.id;
    delete updateBody.createdAt;
    delete updateBody.updatedAt;

    const { data, error } = await supabaseClient
      .from(this.table)
      .update(updateBody)
      .eq('id', id)
      .select()
      .maybeSingle();

    if (error) throw error;
    return wrapDoc(this.table, data);
  }

  async findOneAndUpdate(filter, body, options = {}) {
    const updateBody = { ...body };
    delete updateBody._id;
    delete updateBody.id;
    delete updateBody.createdAt;
    delete updateBody.updatedAt;

    let query = supabaseClient.from(this.table);
    
    if (options.upsert) {
      // upsert setting fields based on 'key' conflict
      const { data, error } = await query
        .upsert(updateBody, { onConflict: 'key' })
        .select()
        .single();
      if (error) throw error;
      return wrapDoc(this.table, data);
    } else {
      for (let [key, val] of Object.entries(filter)) {
        if (key === '_id') key = 'id';
        query = query.eq(key, val);
      }
      const { data, error } = await query
        .update(updateBody)
        .select()
        .maybeSingle();
      if (error) throw error;
      return wrapDoc(this.table, data);
    }
  }

  async findByIdAndDelete(id) {
    const { data, error } = await supabaseClient
      .from(this.table)
      .delete()
      .eq('id', id)
      .select()
      .maybeSingle();
    if (error) throw error;
    return wrapDoc(this.table, data);
  }

  async create(body) {
    const insertBody = { ...body };
    delete insertBody._id;
    delete insertBody.id;

    if (this.table === 'admins' && insertBody.password) {
      insertBody.password = await bcrypt.hash(insertBody.password, 12);
    }

    const { data, error } = await supabaseClient
      .from(this.table)
      .insert([insertBody])
      .select()
      .single();

    if (error) throw error;
    return wrapDoc(this.table, data);
  }

  async insertMany(arr) {
    const cleanArr = arr.map(item => {
      const cleanItem = { ...item };
      delete cleanItem._id;
      delete cleanItem.id;
      return cleanItem;
    });

    const { data, error } = await supabaseClient
      .from(this.table)
      .insert(cleanArr)
      .select();

    if (error) throw error;
    return wrapDocs(this.table, data);
  }

  async countDocuments(filter = {}) {
    let query = supabaseClient.from(this.table).select('*', { count: 'exact', head: true });
    
    for (let [key, val] of Object.entries(filter)) {
      if (key === '_id') key = 'id';
      query = query.eq(key, val);
    }

    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }
}

// Exported Models mapping to Postgres tables
module.exports = {
  supabaseClient, // exported in case manual queries are ever needed
  Admin: new Model('admins'),
  Enquiry: new Model('enquiries'),
  Course: new Model('courses'),
  Job: new Model('jobs'),
  Application: new Model('applications'),
  Testimonial: new Model('testimonials'),
  Certification: new Model('certifications'),
  Partner: new Model('partners'),
  Gallery: new Model('gallery'),
  Settings: new Model('settings')
};
