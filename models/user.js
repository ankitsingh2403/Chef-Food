const mongoose =require("mongoose");

const UserRegisterSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true

    },
    phone:{
        type:String,
        required:true,
        Unique:true,
        trim: true,

    },
    email:{
        type:String,
        required:true,
        Unique:true,
        trim:true,
    },
});

module.exports = mongoose.model("UserRegister",UserRegisterSchema);