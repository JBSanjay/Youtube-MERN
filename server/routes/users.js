import express from 'express';
import { deleteUser, dislike, getUser, like, subscribe, unsubscribe, update} from '../controllers/user.js';
import { verifyToken } from '../verifyToken.js';

const router=express.Router();

//To Update User
router.put('/:id',verifyToken,update);
//To Delete a User Account
router.delete('/:id',verifyToken, deleteUser);
//To Get a user
router.get('/find/:id',getUser);
//to subscribe a channel
router.put('/sub/:id',verifyToken,subscribe);
//to unsubscribe a channel
router.put('/unsub/:id',verifyToken,unsubscribe);
//To like a Video
router.put('/like/:videoid',verifyToken,like);
//To unlike a video
router.put('/dislike/:videoid',verifyToken,dislike);


export default router;