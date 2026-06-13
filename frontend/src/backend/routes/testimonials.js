const router = require('express').Router();
const { Testimonial } = require('../models');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true }).sort({ order: 1 });
    res.json(testimonials);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/all', protect, async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ order: 1 });
    res.json(testimonials);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', protect, async (req, res) => {
  try {
    const t = await Testimonial.create(req.body);
    res.status(201).json(t);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const t = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(t);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: 'Testimonial deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
