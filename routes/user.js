const express=require("express");

const bcrypt=require("bcrypt")

const {generatetoken,verifytoken}=require("../services/authentication.js")

const user=require("../models/users.js")

const router=express.Router();

router.get("/signin",(req,res)=>{

    res.render("signin");
})
router.get("/signup",(req,res)=>{

    res.render("signup");
})
router.post("/signup",async(req,res)=>{

    const {fullname,email,password}=req.body;
    const existinguser=await user.findOne({email});

    if(existinguser){
        return res.render("signup",{msg:" ! email already exist, please use another"});
    }

    const hashedPassword = await bcrypt.hash(password, 10); 
    // console.log("hashedpassword",hashedPassword);

    const newUser = new user({ fullname, email, password: hashedPassword });
        await newUser.save();

        // console.log("user",newUser);
      return res.redirect("/signin");  

})

router.post("/signin",async(req,res)=>{

    const {email,password}=req.body;
    const finduser=await user.findOne({email});
    // console.log("user",finduser);

    if(!finduser){
        return res.render("signin",{valid:"! Invalid Email,User Not Found"});
    }
    
    const ismatch=await bcrypt.compare(password,finduser.password);

    if (!ismatch) {
        return res.render("signin",{valid:"! Incorrect password"});
    }

    const token=generatetoken(finduser);
    // console.log("token",token);
    
    return res.cookie("token",token).redirect("/");

})

router.get("/logout",(req,res)=>{

    res.clearCookie("token").redirect("/");
})


module.exports=router;