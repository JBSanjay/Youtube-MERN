import Video from "../models/Video.js";
import comment from "../models/comment.js"

export const addComment=async(req,res,next)=>{
    const Comment=new comment({...req.body,userId:req.user.id})
    try{
        const saveComment=await Comment.save()
        res.status(200).json(saveComment);
    }catch(err)
    {
        next(err)
    }
}

export const deleteComment=async(req,res,next)=>{
    try{
        const Comment=await comment.findById(req.params.id);
        const video=await Video.findById(req.params.id);
        if(req.user.id===Comment.userId||req.user.id===video.userId)
        {
           await comment.findByIdAndDelete(req.params.id)
           res.status(200).json("Comment deleted")
        }
        else{
            res.status(403).json("You can delete only your comment")
        }
    }catch(err){
        next(err);
    }
}

export const getComments=  async(req,res,next) =>{
    try{
        const comments=await comment.find({videoId:req.params.videoId});
        res.status(200).json(comments); 
    }catch(err)
    {
        next(err)
    }
}