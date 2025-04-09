const express=require("express");
const router =express.Router();

const {Messages} =require("../controllers/message");

router.post("/enquiry",Messages);

module.exports = router;