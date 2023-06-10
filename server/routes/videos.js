import express from 'express';
import { verifyToken } from '../verifyToken.js';
import { addVideo, addview, getVideo, random, trend } from '../controllers/video.js';
import { subscribe } from '../controllers/user.js';

const router=express.Router();
router.post('/',verifyToken,addVideo)
router.put('/:id',verifyToken,addVideo)
router.delete('/:id',verifyToken,addVideo)
router.get('/find/:id',getVideo)
router.put('/view/:id',addview)
router.get('/trend',trend)
router.get('/random',random);
router.get("/sub",subscribe);

export default router;