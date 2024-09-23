import express from "express";
import { login, logout, register ,editProfile  , suggestUser , followUnfollow} from "../controllers/user.controller.js";
import isAuthenticate from "../middlewears/isAuthenticate.js";
import upload from "../middlewears/multer.js";

const router = express.Router();

router.post('/register' , register);
router.post('/login' , login);
router.get('/logout' , isAuthenticate ,logout);
router.get('/suggestUser' , isAuthenticate ,suggestUser);
router.post('/editProfile' ,isAuthenticate, upload.single('file'),  editProfile);
router.get('/followUnfollow/:followId' ,isAuthenticate,  followUnfollow);

export default router;