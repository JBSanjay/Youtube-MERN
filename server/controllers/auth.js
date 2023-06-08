import mongoose from "mongoose";
import User from "../models/User.js";
import bcrypt from 'bcryptjs'
import { createError } from "../error.js";
import jwt  from "jsonwebtoken";

export const signup  = async(req,res,next)=>{
    // res.send(req.body);
    try{
        const salt=bcrypt.genSaltSync(10);
        const hash=bcrypt.hashSync(req.body.password,salt);
        const newUser= new User({...req.body,password: hash}  )
        console.log(salt,hash);
        await newUser.save();
        res.status(200).send("User has been created!")
    }catch(err){
        next(err);
    }
}

export const signin  = async(req,res,next)=>{
    // res.send(req.body);
    try{
       const user = await User.findOne({name:req.body.name});
    //    res.send("Hrllo");
       if(!user)
       {
        return next(createError(404,"user not found"));
       }
       const check=await bcrypt.compare(req.body.password,user.password)
       if(!check)
       {
        return next(createError(400,"Wrong Credentials"))
       }
       const {password,...others}=user._doc;
       const token =jwt.sign({id:user._id},process.env.JWT)
       res.cookie('access_token', token,{
        httpOnly:true
       }).status(200).json(others);
    }catch(err){
        next(err);
    }
    // res.send("Hello");
}