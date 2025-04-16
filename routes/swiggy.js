const express = require("express");
const axios = require("axios");
const router = express.Router();

router.get("/swiggy-restaurants", async (req, res) => {
  const { lat, lng } = req.query;

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

    res.json(response.data);
  } catch (err) {
    console.error("Swiggy API error:", err.message);
    res.status(500).json({ error: "Failed to fetch Swiggy data" });
  }
});

module.exports = router;
