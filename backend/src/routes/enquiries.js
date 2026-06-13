const router = require('express').Router();
const { Enquiry } = require('../models');
const { protect } = require('../middleware/auth');
const { sendEnquiryConfirmation, sendAdminNotification } = require('../utils/email');

// POST /api/enquiries — Public (contact form submit)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, courseInterest, message, type } = req.body;
    if (!name || !email || !phone) return res.status(400).json({ error: 'Name, email, and phone are required' });
    const enquiry = await Enquiry.create({ name, email, phone, courseInterest, message, type: type || 'general' });
    // Send emails (non-blocking)
    sendEnquiryConfirmation({ name, email, courseInterest }).catch(console.error);
    sendAdminNotification(enquiry).catch(console.error);
    res.status(201).json({ success: true, message: 'Enquiry submitted! We will contact you soon.', id: enquiry._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/enquiries — Admin only
router.get('/', protect, async (req, res) => {
  try {
    const { status, type, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (type) filter.type = type;
    const enquiries = await Enquiry.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(parseInt(limit));
    const total = await Enquiry.countDocuments(filter);
    res.json({ enquiries, total, page: parseInt(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH /api/enquiries/:id/status
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(enquiry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/enquiries/:id
router.delete('/:id', protect, async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ message: 'Enquiry deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
