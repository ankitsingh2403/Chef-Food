const express = require('express');
const router = express.Router();
const Address = require('../models/address');

// POST /api/address - Save new address
router.post('/', async (req, res) => {
  try {
    const newAddress = new Address(req.body);
    await newAddress.save();
    res.status(201).json({ message: 'Address saved' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to save address' });
  }
});

// GET /api/address - Get all addresses
router.get('/', async (req, res) => {
  try {
    const addresses = await Address.find().sort({ createdAt: -1 });
    res.status(200).json(addresses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch addresses' });
  }
});

// DELETE /api/address/:id - Delete address by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get address ID from URL parameters
    
    // Find the address by ID and remove it from the database
    const deletedAddress = await Address.findByIdAndDelete(id);

    if (!deletedAddress) {
      return res.status(404).json({ message: 'Address not found' });
    }

    res.status(200).json({ message: 'Address deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete address' });
  }
});

module.exports = router;
