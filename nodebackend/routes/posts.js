const express=require('express');
const router=express.Router();
const multer=require('multer');

const Post=require('../models/postmodel');

const checkuserisloginornot=require('../middleware/check_user');

MIME_TYPE_MAP={
    "image/jpeg":"jpg",
    "image/jpg":"jpg",
    "image/png":"png"
};

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        const isvalid=MIME_TYPE_MAP[file.mimetype];
        var error=new Error("Invalid File Type");
        if(isvalid){
            error=null
        }
        cb(error,'nodebackend/images');
    },

    filename:(req,file,cb)=>{
        /*sample.jpg 
        Sample.jpg
        SAMPLE.jpg
        sample one.jpg 
        sample-one.jpg*/
        const name=file.originalname.toLowerCase().split(" ").join('-');
        const ext=MIME_TYPE_MAP[file.mimetype];
        cb(null,name+Date.now()+'.'+ext);
        

    }
});
router.post("",checkuserisloginornot,multer({storage:storage}).single("image"),(req,res,next)=>{
    const url=req.protocol+"://"+req.get('host');
    const post=new Post({
        title:req.body.title,
        imagePath:url+"/images/"+req.file.filename,
        description:req.body.description
    });
    post.save().then(createpost=>{
        res.status(201).json({
            message:"post added successfully",
            post:{
                ...createpost,
                id:createpost._id
            }
        });
    });
});

router.put("/:id",checkuserisloginornot,multer({storage:storage}).single("image"),(req,res,next)=>{
   //console.log(req.params.id);
   console.log(req.file);
    var imagePath=req.body.imagePath;

    if(req.file){
        const url=req.protocol+"://"+req.get('host');
        imagePath=url+"/images/"+req.file.filename;
    }
    console.log(imagePath);
    const post=new Post({
        _id:req.body.id,
        title:req.body.title,
        imagePath:imagePath,
        description:req.body.description
    });

    Post.updateOne({_id:req.body.id},post).then(result=>{
        res.status(200).json({
            message:"Post Updated successfully",
            result:result
        });
    });
});

router.get("",(req,res,next)=>{
    Post.find().then(documents=>{
        res.status(200).json({
            message:"Posts are coming successfully",
            posts:documents
        });
    });
});

router.delete("/:id",checkuserisloginornot,(req,res,next)=>{
    Post.deleteOne({_id:req.params.id}).then(()=>{
        res.status(200).json({
            message:"Post Deleted Successfully",
            
        });
    });
});

router.get("/:postId",(req,res,next)=>{
    //console.log(req.params.postId);
    Post.findById(req.params.postId).then(post=>{
       // console.log(post);
        if(post){
            res.status(200).json(post);
        }
        else{
            res.status(401).json({
                message:"Post Not Found"
            });
        }
    });
});

module.exports=router;
