const router = require('express').Router();
const { Partner } = require('../models');
const { protect } = require('../middleware/auth');

router.get('/', async (req, res) => {
  try { res.json(await Partner.find({ isActive: true }).sort({ order: 1 })); } catch (err) { res.status(500).json({ error: err.message }); }
});
router.post('/', protect, async (req, res) => {
  try { res.status(201).json(await Partner.create(req.body)); } catch (err) { res.status(500).json({ error: err.message }); }
});
router.put('/:id', protect, async (req, res) => {
  try { res.json(await Partner.findByIdAndUpdate(req.params.id, req.body, { new: true })); } catch (err) { res.status(500).json({ error: err.message }); }
});
router.delete('/:id', protect, async (req, res) => {
  try { await Partner.findByIdAndDelete(req.params.id); res.json({ message: 'Deleted' }); } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
