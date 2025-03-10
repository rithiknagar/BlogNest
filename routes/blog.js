const express=require("express");

const multer=require("multer");

const path=require("path");

const router=express.Router();

const blog=require("../models/blog.js");

const comments=require("../models/comments.js");


const storage = multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, `./public/uploads`);

    },

    filename: function (req, file, cb) {

      const nameoffile = `${Date.now()}-${file.originalname}`;
      cb(null,nameoffile)

    }

  });
  
  const upload = multer({storage })

router.get("/add-new",(req,res)=>{

   return res.render("addblog",{user:req.user});
})

router.get("/:id",async(req,res)=>{
  
  const token=req.cookies["token"];

  if(!token){
   return res.redirect("/signin");
  }

     const blogs=await blog.findById(req.params.id).populate("createdBy");
     const comment=await comments.find({blogId:req.params.id}).populate("createdBy");

    return res.render("blog",{user:req.user,blog:blogs,comments:comment});

})

router.post("/comments/:blogid",async(req,res)=>{
   
    const token=req.cookies["token"];

      if(!token){

       return res.redirect("/signin");
      }

  const com= await comments.create({

        content:req.body.content,
        blogId:req.params.blogid,
        createdBy:req.user._id

    })

    return res.redirect(`/blog/${req.params.blogid}`)

})

router.post("/",upload.single("coverImage"),async(req,res)=>{

    const{title,body}=req.body;

    // console.log(req.body);
    // console.log(req.file);
    
    const curblog=await blog.create({

       title,
       body,
       coverImageURL:`uploads/${req.file.filename}`,
       createdBy:req.user._id

    })

    console.log("curblog",curblog);

    return res.redirect(`/blog/${curblog._id}`)
})

module.exports=router;