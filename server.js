const express=require("express");
const app=express();
const mongoose=require("mongoose");
require("dotenv").config();
const passport=require("passport")
//configure passport
require('./config/passport')(passport);

//connect to mongodb
mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log("connected to db"))
.catch(err=>console.log("err in db connect ",err))

//body parser
app.use(express.json());
app.use(passport.initialize())

//userapi
app.use('/user',require('./routes/userapi'))
app.listen(3000,()=>{console.log("server on 3000");})