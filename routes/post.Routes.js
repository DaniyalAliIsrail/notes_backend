import express from 'express'
import {verifyToken}  from '../utils/verifyUser.js';
import {create,  deletePost,  getPost ,updatePost ,getALLPost} from '../controller/post.Controller.js';
const router = express.Router();

router.post("/create",create) //vt
router.get("/getpost",getPost);
router.delete("/deletepost/:postId/:userId",deletePost) //vt
router.put("/updatepost/:postId/:userId",updatePost) //vt
router.get("/getAllPost",getALLPost) 

// getAllPost
export default router