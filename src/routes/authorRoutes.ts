import express, {Request, Response} from 'express';
import { Login, Register, verifyAuthor } from '../controller/authorController';
import { upload } from '../utils/multer';


const router =express.Router()

router.post('/create-author', Register)
router.post('/verify/:signature', verifyAuthor)
router.post('/login-author', Login)


export default router