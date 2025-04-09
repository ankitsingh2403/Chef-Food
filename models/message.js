const mongoose=require("mongoose");

const messageSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        Unique:true,

    },
    phone:{
        type:String,
        required:true,
        Unique:true,
        minLength:[10,"Phone number must Contain exact 10 digits"],
        maxLength:[10,"Phone number must Contain exact 10 digits"],
        

    },
    message:{
        type:String,
        required:true,
        minLength:[10,"Message Must Contain Atleast 10 character"],

    }


});

module.exports =mongoose.model("Message",messageSchema);