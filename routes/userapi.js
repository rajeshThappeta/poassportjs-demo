const express=require("express");
const userRouter=express.Router();
const User=require("../models/User.js");
const bcrypt=require("bcryptjs");
const passport=require("passport");

//register
userRouter.post('/register',(req,res)=>{
    
    var newUser=new User(req.body)
    User.findOne({username:newUser.username})
    .then(user=>{
        if(!user){
          

            //hash password
            var bcrypt = require('bcryptjs');
            bcrypt.genSalt(10, function(err, salt) {
                 bcrypt.hash(newUser.password, salt, function(err, hash) {
                      //create user
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
// userRouter.post('/login',(req,res)=>{
//     res.send("login")
// });


// userRouter.post('/login', 
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });


userRouter.post('/login', function(req, res, next) {

    //here "info" receives the data sent by passpoer.js middleware
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.send({message:info.message}); }

      //it calls serializeUser 
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send(user);
      });
    })(req, res, next);
  });
module.exports=userRouter;