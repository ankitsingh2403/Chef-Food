const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/swiggy-restaurants", async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  try {
    const response = await axios.get("https://www.swiggy.com/dapi/restaurants/list/v5", {
      params: {
        lat,
        lng,
        "is-seo-homepage-enabled": true,
        page_type: "DESKTOP_WEB_LISTING",
      },
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/113 Safari/537.36",
      },
    });

    const restaurants = response.data.data.cards
      .map(card => card.card?.gridElements?.infoWithStyle?.restaurants)
      .flat()
      .filter(Boolean);

    if (!restaurants.length) {
      return res.status(404).json({ error: "No restaurants found" });
    }

    res.json({ restaurants });
  } catch (err) {
    console.error("Swiggy API error:", err.message);
    res.status(500).json({ error: "Failed to fetch Swiggy data", details: err.message });
  }
});

module.exports = router;
