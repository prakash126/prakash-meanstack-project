const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const User=require('../models/usermodel.js');

router.post("/signup",(req,res,next)=>{
  bcrypt.hash(req.body.password,10).then(encryptpassword=>{
            const user=new User({
                email:req.body.email,
                password:encryptpassword
            });
            user.save().then(result=>{
                res.status(201).json({
                    message:'User Added Successfully',
                    result:result
                })
            }).catch(error=>{
                res.status(500).json({
                    message:'Registration Failed',
                    error:error
                })
            });
  });
    
});

router.post("/login",(req,res,next)=>{
    var fetcheduser;
    User.findOne({email:req.body.email}).then(user=>{
        if(!user){
            res.status(401).json({
                message:"Authentication failed"
            });
        }
        fetcheduser=user;
        return bcrypt.compare(req.body.password,user.password);}).then(result=>{
            if(!result){
                res.status(401).json({
                    message:"Authentication failed"
                }); 
            }
            const token=jwt.sign({user:fetcheduser.email,userId:fetcheduser._id},'jjj_hhh_iii_kkk_sss_btech_giet_bihar',{expiresIn:'1h'});
            res.status(200).json({
                token:token 
            })
        }).catch(error=>{
                res.status(401).json({
                    message:"Authentication failed",
                    error:error
                });
            });
        
    
});

module.exports=router;