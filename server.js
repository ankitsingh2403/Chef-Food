const express=require("express");
const dotenv=require("dotenv")
const app=express();
const cors =require("cors");


dotenv.config();
const PORT =process.env.PORT || 3000;

app.use(cors({
    origin:process.env.FRONTEND_URL,
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
}))

//middleware to parse json request body
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running");
  });

const registerRoutes = require("./routes/register");
const enquiryROutes = require("./routes/enquiry")
app.use("/api", registerRoutes);
app.use("/api",enquiryROutes);


app.listen(PORT,()=>{
        console.log(`Server is Running at ${PORT}`);
});

const dbConnect=require("./config/database")
dbConnect();

const errorMiddleware = require("./middleware/errorMiddleware");
app.use(errorMiddleware); // note:Always use this at bottom









