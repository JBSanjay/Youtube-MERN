import express from 'express';
import { addComment } from '../controllers/comment.js';

const router=express.Router();
router.get('/comment', addComment)
export default router;