const express = require('express');
const axios = require('axios');
const router = express.Router();

// Fetch restaurant menu using restaurantId
router.get('/swiggy-menu', async (req, res) => {
  const { restaurantId, lat, lng } = req.query;

  // Check if necessary parameters are provided
  if (!restaurantId || !lat || !lng) {
    return res.status(400).json({ error: 'restaurantId, lat, and lng are required' });
  }

  try {
    // API URL for fetching the menu
    const MENU_API = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}`;

    // Fetch menu data from Swiggy API
    const response = await axios.get(MENU_API, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/113 Safari/537.36',
      },
    });

    // Extract menu data from the response
    const menu = response.data.data;

    if (!menu) {
      return res.status(404).json({ error: 'Menu not found for this restaurant' });
    }

    // Return the menu data
    res.json({ menu });
  } catch (err) {
    console.error('Swiggy API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch Swiggy menu data', details: err.message });
  }
});

module.exports = router;
