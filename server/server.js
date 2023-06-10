import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import auth from './routes/auth.js';
import user from './routes/users.js';
import video from './routes/videos.js';
import comment from './routes/comments.js';
import cookieParser from "cookie-parser";
import cors from 'cors';

const app=express();
dotenv.config();

const connect=() =>{
     mongoose.connect(process.env.Connect).then(()=>{
        console.log("connected to db");
     }).catch((err)=>{
        throw err;
        console.log(err);
     })
} 
connect()
// app.use(cookieParser)
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use("/api/users",user);
app.use("/api/videos",video);
app.use("/api/comments",comment);
app.use("/api/auth",auth);
app.use((err,req,res,next)=>{
   const status=err.status||500;
   const message=err.message||"Something went wrong";
   return res.status(status).json({
      success:false,
      status,
      message,
   })
})

app.listen(process.env.Port,()=>{
    console.log(`server is running at ${process.env.Port}`);
})