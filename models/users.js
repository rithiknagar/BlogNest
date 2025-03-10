const mongoose=require("mongoose");

const userschema=new mongoose.Schema({

    fullname:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
    },

    password:{
        type:String,
        required:true,
    },

    profileImageURL:{
        type:String,
        default:"/images/profileimage.png"
    },

    role:{
        type:String,
        enum:["user","admin"],
        default:"user",
    }

},{timestamps:true})

const user=mongoose.model("user",userschema);

module.exports=user;