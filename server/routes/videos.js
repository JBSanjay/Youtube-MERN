import express from 'express';
import { video } from '../controllers/video.js';

const router=express.Router();
router.get('/video', video)
export default router;