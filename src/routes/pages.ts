import express, {application, Request, Response} from "express"
import {getBook} from "../controller/bookController"
import {Login, Register } from "../controller/authorController"

const router = express.Router()

router.get('/', getBook)
router.post('/login', Login )
router.post('/register', Register  )
router.get('/login', function(req: Request, res: Response) {
    res.render('login');
});
router.get('/signup', function(req: Request, res: Response) {
  
    res.render('signup');

  });
  router.get('/dashboard', function(req: Request, res: Response) {
  
    res.render('dashboard');

  });
 router.get('/verify', function(req: Request, res: Response) {
  
    res.render('verify');

  });

export default router
