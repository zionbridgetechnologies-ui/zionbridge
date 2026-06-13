const router = require('express').Router();
const { Application } = require('../models');
const { protect } = require('../middleware/auth');

router.post('/', async (req, res) => {
  try {
    const app = await Application.create(req.body);
    res.status(201).json({ success: true, message: 'Application submitted!', id: app._id });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/', protect, async (req, res) => {
  try {
    const apps = await Application.find().populate('jobId', 'title company').sort({ createdAt: -1 });
    res.json(apps);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.patch('/:id/status', protect, async (req, res) => {
  try {
    const app = await Application.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(app);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
