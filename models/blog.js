const mongoose=require("mongoose");

const {Schema}=require("mongoose");

const blogschema=new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },

    body:{
        type:String,
        required:true,
    },

    coverImageURL:{
        type:String,
        required:false,
    },
    
    createdBy:{
    type:Schema.Types.ObjectId,
    ref:"user"
    }

},{timestamps:true});

const blog=mongoose.model("blog",blogschema);

module.exports=blog;