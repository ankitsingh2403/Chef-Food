const express=require("express");
const router=express.Router();

//import Controller
const {Registration} = require("../controllers/userRegister");


//define API router
router.post("/register",Registration);


module.exports=router;
