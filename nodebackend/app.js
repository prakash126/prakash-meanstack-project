const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const userlinks=require('./routes/users.js');
const postlinks=require('./routes/posts.js');

const path=require('path');

mongoose.connect('mongodb+srv://prakashuser:nZP8kwqWQAnfBHEW@prakash-clst-sw9cv.mongodb.net/prakash_meanstack_new_dbase?retryWrites=true&w=majority',{useNewUrlParser:true,useUnifiedTopology: true});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use("/images",express.static(path.join("nodebackend/images")));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept,authorization");

res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,PATCH,DELETE,OPTIONS");
//res.end(JSON.stringify(req.body, null, 2))
next();
});


app.use("/users",userlinks);
app.use("/posts",postlinks);
module.exports=app;
