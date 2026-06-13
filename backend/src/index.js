const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
require('dotenv').config();

const app = express();

// Security Middleware
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
app.use(morgan('combined'));

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later.' }
});
app.use('/api/', limiter);

// CORS
app.use(cors({
  origin: [process.env.FRONTEND_URL || 'http://localhost:3000', 'https://zionbridgetechnologies.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files for uploads
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/enquiries', require('./routes/enquiries'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/jobs', require('./routes/jobs'));
app.use('/api/testimonials', require('./routes/testimonials'));
app.use('/api/certifications', require('./routes/certifications'));
app.use('/api/partners', require('./routes/partners'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/settings', require('./routes/settings'));
app.use('/api/applications', require('./routes/applications'));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Zionbridge Technologies API Running', timestamp: new Date() });
});

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

// Verify database connection and seed admin
const verifyDbAndStart = async () => {
  try {
    const { Admin } = require('./models');
    // Test query to verify connection to Supabase
    await Admin.findOne();
    console.log('✅ Supabase Connected & verified');

    // Seed admin user & settings
    const { seedAdmin } = require('./utils/seed');
    await seedAdmin();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error('❌ Supabase initialization error:', err.message);
    console.error('Please make sure you have run the database schema SQL in your Supabase dashboard SQL Editor and populated the correct SUPABASE_SERVICE_ROLE_KEY and SUPABASE_URL in backend/.env');
    process.exit(1);
  }
};

verifyDbAndStart();

module.exports = app;
