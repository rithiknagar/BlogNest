const cookieparser= require("cookie-parser");

const {verifytoken}=require("../services/authentication.js")

function checkforauthentication(cookiename){

      return (req,res,next)=>{
        const token=req.cookies[cookiename];

      if(!token){
       return next();
      }

      try {
        const payload=verifytoken(token);
        req.user=payload;
      } 
      catch (error) {
        
      }

     return  next();

      }
}


module.exports={checkforauthentication}