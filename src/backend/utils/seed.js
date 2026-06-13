const { Admin, Course, Testimonial, Partner, Settings } = require('../models');

const seedAdmin = async () => {
  try {
    const exists = await Admin.findOne({ email: process.env.ADMIN_EMAIL || 'admin@zionbridgetechnologies.com' });
    if (!exists) {
      await Admin.create({
        name: 'Super Admin',
        email: process.env.ADMIN_EMAIL || 'admin@zionbridgetechnologies.com',
        password: process.env.ADMIN_PASSWORD || 'Admin@Zion2024',
        role: 'superadmin'
      });
      console.log('✅ Admin seeded');
    }

    // Seed default settings
    const defaults = [
      { key: 'company_phone', value: '+91 98765 43210' },
      { key: 'company_email', value: 'info@zionbridgetechnologies.com' },
      { key: 'company_address', value: '123, Business Street, Corporate Park, India' },
      { key: 'whatsapp_number', value: '919876543210' },
      { key: 'students_trained', value: '25000' },
      { key: 'placements', value: '15000' },
      { key: 'hiring_companies', value: '250' },
      { key: 'years_excellence', value: '10' },
      { key: 'facebook_url', value: 'https://facebook.com/zionbridgetechnologies' },
      { key: 'linkedin_url', value: 'https://linkedin.com/company/zionbridgetechnologies' },
      { key: 'instagram_url', value: 'https://instagram.com/zionbridgetechnologies' },
    ];
    for (const s of defaults) {
      await Settings.findOneAndUpdate({ key: s.key }, s, { upsert: true });
    }

    // Seed sample courses
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      await Course.insertMany([
        { title: 'Full Stack Web Development', category: 'software', description: 'Master React, Node.js, MongoDB & more with real projects.', syllabus: ['HTML/CSS', 'JavaScript', 'React.js', 'Node.js', 'MongoDB', 'Deployment'], duration: '4 Months', fees: '₹25,000', badge: 'Most Popular', isActive: true, order: 1 },
        { title: 'Python Programming', category: 'software', description: 'Python from basics to advanced with data science & automation.', syllabus: ['Python Basics', 'OOP', 'Django', 'Data Science', 'ML Basics'], duration: '3 Months', fees: '₹18,000', isActive: true, order: 2 },
        { title: 'CCNA Networking', category: 'networking', description: 'Cisco Certified Network Associate — get job-ready in networking.', syllabus: ['Network Fundamentals', 'Routing & Switching', 'Security Basics', 'Labs'], duration: '2 Months', fees: '₹15,000', badge: 'High Demand', isActive: true, order: 3 },
        { title: 'HR Generalist Course', category: 'hr', description: 'Complete HR training with recruitment, payroll & HR operations.', syllabus: ['Recruitment', 'Payroll', 'HR Compliance', 'HRMS Tools', 'Labour Law'], duration: '2 Months', fees: '₹12,000', isActive: true, order: 4 },
        { title: 'Java Full Stack', category: 'software', description: 'Java, Spring Boot, Hibernate, Microservices & AWS deployment.', syllabus: ['Core Java', 'Spring Boot', 'REST APIs', 'Microservices', 'SQL'], duration: '4 Months', fees: '₹22,000', isActive: true, order: 5 },
        { title: 'Private Bank Jobs Prep', category: 'banking', description: 'Interview-focused training for HDFC, ICICI, Axis & more bank jobs.', syllabus: ['Banking Basics', 'Interview Prep', 'Aptitude', 'Communication', 'Soft Skills'], duration: '45 Days', fees: '₹8,000', badge: '100% Placement', isActive: true, order: 6 },
      ]);
      console.log('✅ Courses seeded');
    }

    // Seed testimonials
    const tCount = await Testimonial.countDocuments();
    if (tCount === 0) {
      await Testimonial.insertMany([
        { name: 'Rohit Sharma', designation: 'Software Developer', company: 'TCS', review: 'Thank you Zionbridge Technologies for providing excellent training and placement support. I got placed in a top MNC!', rating: 5, course: 'Full Stack Development', placedSalary: '6.5 LPA', isActive: true },
        { name: 'Anjali Verma', designation: 'HR Executive', company: 'Infosys', review: 'The HR training program was amazing. Mock interviews really helped me crack my dream job.', rating: 5, course: 'HR Generalist', placedSalary: '4.2 LPA', isActive: true },
        { name: 'Karan Singh', designation: 'Network Engineer', company: 'HCL', review: 'Real-time training and practical knowledge helped me build my career in networking.', rating: 5, course: 'CCNA Networking', placedSalary: '5.8 LPA', isActive: true },
        { name: 'Neha Patel', designation: 'Business Analyst', company: 'Wipro', review: 'Best institute for career guidance and placement support. Highly recommended!', rating: 5, course: 'Full Stack Development', placedSalary: '7 LPA', isActive: true },
      ]);
      console.log('✅ Testimonials seeded');
    }

    // Seed partners
    const pCount = await Partner.countDocuments();
    if (pCount === 0) {
      await Partner.insertMany([
        { name: 'Tata Consultancy Services', isActive: true, order: 1 },
        { name: 'Infosys', isActive: true, order: 2 },
        { name: 'Wipro', isActive: true, order: 3 },
        { name: 'HCL Technologies', isActive: true, order: 4 },
        { name: 'Tech Mahindra', isActive: true, order: 5 },
        { name: 'Accenture', isActive: true, order: 6 },
      ]);
      console.log('✅ Partners seeded');
    }
  } catch (err) {
    console.error('Seed error:', err.message);
  }
};

module.exports = { seedAdmin };
