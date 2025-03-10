require('dotenv').config();

const path=require("path");

const express=require("express");

const userRoute=require("./routes/user.js");

const blogRoute=require("./routes/blog.js");

const blog=require("./models/blog.js");

const connecttomongodb=require("./connection.js")

const cookieparser=require("cookie-parser")

const {checkforauthentication}=require("./middlewares/authentication.js")

const mongoose=require("mongoose");

const app=express();

const PORT=process.env.PORT||8000;


app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({extended:false}));
app.use(cookieparser());
app.use(checkforauthentication("token"));
app.use(express.static(path.resolve("./public")));

connecttomongodb(process.env.MONGO_URL)
.then(()=>console.log("mongoDB connected succesfully"))

app.get("/",async(req,res)=>{ 

    const allblogs=await blog.find({}).sort({ createdAt: 1 });
    res.render("home",{user:req.user,blogs:allblogs});
})

app.use("/",userRoute)
app.use("/blog",blogRoute);


app.listen(PORT,()=>console.log(`server started at PORT:${PORT}`));