const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/profile", userController.getProfile);
router.post("/logout", userController.logoutUser); // <-- Added logout route

module.exports = router;
