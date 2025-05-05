import express from "express";
import { test,updateUser , deleteUser,signout } from "../controller/userController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
router.get('/test',test);
router.put('/update/:userId',updateUser)
router.delete('/delete/:userId',deleteUser)
router.post('/signout',signout)
export default router;