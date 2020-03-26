const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
    try{
       /* barrer jjj_hhh_iii_kkk_sss_btech_giet_bihar
        array[0]=barrer 
        array[1]=jjj_hhh_iii_kkk_sss_btech_giet_bihar */
        const token=req.headers.authorization.split(" ")[1];
        jwt.verify(token,'jjj_hhh_iii_kkk_sss_btech_giet_bihar');
        next();
    }
    catch(error){
        res.status(401).json({message:"Authentication Failed"});
    }
}