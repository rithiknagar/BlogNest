const mongoose=require("mongoose");

function connecttomongodb(url){
    return mongoose.connect(url);
}
module.exports=connecttomongodb;