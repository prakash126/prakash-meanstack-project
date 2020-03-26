const mongoose=require('mongoose');
const postdata=mongoose.Schema({
    title:{type:String,required:true},
    imagePath:{type:String,required:true},
    description:{type:String,required:true}
});
module.exports=mongoose.model('Post',postdata);