const mongoose=require("mongoose");

const dbConnect=() =>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    
    }).then(()=>{
        console.log("Database is Connected");

    }).catch((err)=>{
        console.log("We Have an Error Connecting With Database")
        console.log(err);
    });
};

module.exports=dbConnect;