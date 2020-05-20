const express=require("express");
const userRouter=express.Router();
const User=require("../models/User.js");
const bcrypt=require("bcryptjs")

//register
userRouter.post('/register',(req,res)=>{
    
    var newUser=new User(req.body)
    User.findOne({username:newUser.username})
    .then(user=>{
        if(!user){
            //create user

            //hash password
            var bcrypt = require('bcryptjs');
            bcrypt.genSalt(10, function(err, salt) {
                 bcrypt.hash(newUser.password, salt, function(err, hash) {

                    newUser.password=hash;
                    newUser.save()
                    .then(user=>res.send(user))
                    .catch(err=>res.send(err.message))
             });
            });
          
        }
        else{
            //user existed
            res.send({message:"user existed"})
        }
    })
    .catch(err=>console.log("err in finuser",err))
});


//login
userRouter.post('/login',(req,res)=>{
    res.send("login")
});
module.exports=userRouter;