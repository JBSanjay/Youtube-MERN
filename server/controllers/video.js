import { createError } from "../error.js";
import Video from "../models/Video.js"

export const addVideo=async(req,res,next)=>{
   const newVideo= new Video({userId:req.user.id,...req.body})
    try{
        const savedVideo=await newVideo.save();
        res.status(200).json(savedVideo);
    }catch(err){
        next(err)
    }
}


export const updateVideo=async(req,res,next)=>{
    try{
        const video=await Video.findById(req.params.id);
        if(!video) 
        {
            return next(createError(404,"Video Not Found"))
        }
        if(req.user.id===video.userId)
        {
            const updatedVideo=await Video.findByIdAndUpdate(req.params.id,
                {
                    $set:req.body,
                },
                {new:true}
                );
                res.status(200).json(updatedVideo);
        }
        else
        {
            return next(createError(403,"you can update only your video!"));
        }
    }catch(err){
        next(err)
    }
}


export const deletevideo=async(req,res,next)=>{
    try{
        const video=await Video.findById(req.params.id);
        if(!video) 
        {
            return next(createError(404,"Video Not Found"))
        }
        if(req.user.id===video.userId)
        {
            const updatedVideo=await Video.findByIdAndDelete(req.params.id);
            const msg="Video deleted Successfully";
            res.status(200).json(msg);
        }
        else
        {
            return next(createError(403,"you can update only your video!"));
        }
    }catch(err){
        next(err)
    }
}

export const getVideo=async(req,res,next)=>{
    try{
        const getVideo=Video.findById(req.params.id);
        res.status(200).json(getVideo);
    }catch(err)
    {
        next(err);
    }
}

export const addview= async(req,res,next)=>{
    try{
        await Video.findByIdAndUpdate(req.params.id,{
            $inc:{views:1},
        })
        res.status(200).json("view has been increased");
    }
    catch(err){
        next(err);
    }
}

export const trend= async(req,res,next)=>{
    try{
        const trend =await Video.sort({views:-1})
        res.status(200).json(trend);
    }
    catch(err){
        next(err);
    }
}

export const random= async(req,res,next)=>{
    try{
        const video=await Video.aggregate([{$sample:{size:40}}]);
        res.status(200).json(video);
    }
    catch(err){
        next(err);
    }
}


export const subscribe= async(req,res,next)=>{
    try{
        await Video.findByIdAndUpdate(req.params.id,{
            $inc:{views:1},
        })
        res.status(200).json("view has been increased");
    }
    catch(err){
        next(err);
    }
}

 