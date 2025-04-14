const express=require("express");
const router=express.Router();

const{
    sendOtp,
    verifyOtp,
    logoutUser
} =require("../controllers/authController");

router.post("/send-otp",sendOtp);
router.post("/verify-otp",verifyOtp);
router.post("/logout",logoutUser);

module.exports=router;
