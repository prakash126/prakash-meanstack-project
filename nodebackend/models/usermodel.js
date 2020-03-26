const mongoose=require('mongoose');
const uniqueValidator=require('mongoose-unique-validator');
const userdata=mongoose.Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
});
userdata.plugin(uniqueValidator);

module.exports=mongoose.model("User",userdata);
