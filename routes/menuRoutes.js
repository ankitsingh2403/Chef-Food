const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/swiggy-menu', async (req, res) => {
  const { restaurantId, lat, lng } = req.query;

  if (!restaurantId || !lat || !lng) {
    return res.status(400).json({ error: 'restaurantId, lat, and lng are required' });
  }

  try {
    const MENU_API = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}`;

    const response = await axios.get(MENU_API, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/113 Safari/537.36',
      },
    });

    const menu = response.data.data;

    if (!menu) {
      return res.status(404).json({ error: 'Menu not found for this restaurant' });
    }

    res.json({ menu });
  } catch (err) {
    console.error('Swiggy API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch Swiggy menu data', details: err.message });
  }
});

module.exports = router;
