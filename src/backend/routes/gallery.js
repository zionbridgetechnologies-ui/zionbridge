const router = require('express').Router();
const { Gallery } = require('../models');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    if (category && category !== 'all') filter.category = category;
    res.json(await Gallery.find(filter).sort({ createdAt: -1 }));
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.post('/', protect, async (req, res) => {
  try { res.status(201).json(await Gallery.create(req.body)); } catch (err) { res.status(500).json({ error: err.message }); }
});
router.delete('/:id', protect, async (req, res) => {
  try { await Gallery.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
