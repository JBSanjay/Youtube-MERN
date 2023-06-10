import { createError } from "../error.js"
import User from "../models/User.js"

export const update=async(req,res,next)=>{
    if(req.params.id===req.user.id)
    {
        try{
            console.log(req.cookies)
            const updateuser=await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{new:true})
            res.status(200).json(updateuser);
        }catch(err){
            console.log(req.cookies.access_token)
            next(err)
        }
    }  
    else
    {
        return next(createError(403,"You can only make change of your account"))
    }   
}

export const deleteUser=async(req,res,next)=>{
    if(req.params.id===req.user.id)
    {
        try{
            console.log(req.cookies)
            const updateuser=await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Account is deleted");
        }catch(err){
            console.log(req.cookies.access_token)
            next(err)
        }
    }  
    else
    {
        return next(createError(403,"You can only Delete your account"))
    }    
}

export const getUser=async(req,res,next)=>{
      try{
        const getUser=await User.findById(req.params.id);
        res.status(200).json(getUser);
      }catch(err){
        next(err)
      }
}

export const subscribe=async(req,res,next)=>{
    try{
        await User.findById(req.user.id,{
            $push:{subscribedUsers:req.params.id},
        })
        await User.findById(req.params.id,{
            $inc:{subscribers:1},
        })
        res.status(200).json("Subscribed Successfully");
    }catch(err){
      next(err)
    }
}

export const unsubscribe=async(req,res,next)=>{
    try{
        await User.findById(req.user.id,{
            $pull:{subscribedUsers:req.params.id},
        })
        await User.findById(req.params.id,{
            $inc:{subscribers:-1},
        })
        res.status(200).json("Subscribed Successfully");
    }catch(err){
      next(err)
    }
}

export const like=async(req,res,next)=>{
    try{

    }catch(err){
      next(err)
    }
}

export const dislike=async(req,res,next)=>{
    try{

    }catch(err){
      next(err)
    }
}

