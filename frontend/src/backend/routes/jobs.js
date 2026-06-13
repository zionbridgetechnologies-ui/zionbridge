const router = require('express').Router();
const { Job } = require('../models');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    if (category && category !== 'all') filter.category = category;
    const jobs = await Job.find(filter).sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/all', protect, async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', protect, async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id', protect, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(job);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
