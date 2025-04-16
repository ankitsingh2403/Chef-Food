const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/swiggy-restaurants", async (req, res) => {
  const { lat, lng } = req.query;

  // Validate lat and lng query params
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

    // Check if data exists and handle empty responses
    if (!response.data || !response.data?.data?.cards) {
      return res.status(404).json({ error: "No restaurant data found" });
    }

    // Extract restaurant data (Adjust based on the structure of the response)
    const restaurants = response.data.data.cards
      .map((card) => card.card?.gridElements?.infoWithStyle?.restaurants)
      .flat()
      .filter(Boolean);

    // If no restaurants are found
    if (!restaurants.length) {
      return res.status(404).json({ error: "No restaurants found" });
    }

    // Send the response with the restaurant data
    res.json({ restaurants });
  } catch (err) {
    console.error("Swiggy API error:", err.message);
    // Handle network errors or unexpected responses
    res.status(500).json({ error: "Failed to fetch Swiggy data", details: err.message });
  }
});

module.exports = router;
