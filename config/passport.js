const LocalStrategy=require("passport-local");
const User=require("../models/User");
const bcrypt=require("bcryptjs");

//this function can be called by passing passport object
module.exports=function(passport){
passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false,{message:"email not registered"}); }

       //compare password
       bcrypt.compare(password,user.password,(err,isMatched)=>{
           if(err){
               console.log("err in password comapare ",err);
           }
           if(isMatched){
               return done(null,user)
           }
           else{
               return done(null,false,{message:"password is incorrect"})
           }
       })
      });
    }
  ));


  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}