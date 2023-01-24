import express from "express"
import { createBook, deleteBook, getBook, getOne, updateBook } from '../controller/bookController';

const router =express.Router()


router.post('/createbook', createBook)
router.get('/getbook', getBook)
router.get('/getbook/:id', getOne)
router.patch('/updatebook/:id', updateBook)
router.delete('/deletebook/:id', deleteBook)

export default router 