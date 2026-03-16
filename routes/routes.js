import express from 'express';
import { request, response } from "express";
import { signupUser,loginUser} from '../controller/user-controller.js';
//import upload from '../utils/upload.js';
import { deletecomment, getAllComment, newcomment } from '../controller/comment-controller.js';
import upload from '../utils/upload.js';
//import multer from '../utils/upload.js';
import { getImage, uploadImage } from '../controller/image-controller.js';
import { createPost, deletePost, getAllPosts, getPost, updatePost } from '../controller/post-controller.js';
import { authenticatetoken } from '../controller/jwt-controller.js';
const url = '';
const router=express.Router();
router.post('/signup',signupUser);
router.post('/login',loginUser);

router.post('/file/upload', upload.single("file"), uploadImage);
router.get('/file/:filename',getImage);
router.post('/create',authenticatetoken,createPost)

router.get('/posts', authenticatetoken, getAllPosts);
//console.log(request.body);
//console.log(request.file);

router.get('/post/:id', authenticatetoken,getPost );

router.put('/update/:id', authenticatetoken, updatePost);
router.delete('/delete/:id', authenticatetoken, deletePost);
router.get('/comment/:id',authenticatetoken,getAllComment);
router.post('/comment/new',authenticatetoken,newcomment );

router.delete("/comment/delete",authenticatetoken,deletecomment);
export default router;