const mongoose=require("mongoose");

const {Schema}=require("mongoose");

const comentschema=new mongoose.Schema({

    content:{
        type:String,
        required:true,
    },

    blogId:{
        type:Schema.Types.ObjectId,
        ref:"blog"
    },

    createdBy:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }

    
},{timestamps:true})

const comments=mongoose.model("comments",comentschema);

module.exports=comments;