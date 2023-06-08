import { createError } from "../error.js"

export const update=(req,res,next)=>{
    if(req.params.id===req.user.id)
    {

    }  
    else
    {
        return next(createError(403,"You can only make change of your account"))
    }   
}

export const deleteUser=(req,res,next)=>{
      
}

export const getUser=(req,res,next)=>{
      
}

export const subscribe=(req,res,next)=>{
      
}

export const unsubscribe=(req,res,next)=>{
      
}

export const like=(req,res,next)=>{
      
}

export const dislike=(req,res,next)=>{
      
}

