const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/swiggy-restaurants", async (req, res) => {
  const { lat, lng } = req.query;

  // Ensure lat and lng are provided
  if (!lat || !lng) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  try {
    // Make the request to the Swiggy API using the full URL
    const response = await axios.get("https://www.swiggy.com/dapi/restaurants/list/v5", {
      params: {
        lat,                      // Latitude
        lng,                      // Longitude
        "is-seo-homepage-enabled": true,  // Param specific to Swiggy API
        page_type: "DESKTOP_WEB_LISTING", // Param specific to Swiggy API
      },
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/113 Safari/537.36",
      },
    });

    // Send the Swiggy response back to the client exactly as received
    res.json(response.data);
  } catch (err) {
    console.error("Error fetching data from Swiggy API:", err.message);
    res.status(500).json({ error: "Failed to fetch data from Swiggy API", details: err.message });
  }
});

module.exports = router;
