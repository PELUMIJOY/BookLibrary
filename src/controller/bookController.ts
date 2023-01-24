import { Request, Response } from "express";
import Book from "../model/bookModel";
import {JwtPayload} from 'jsonwebtoken'

export const createBook = async (req: JwtPayload, res: Response) => {
  try {
    const{_id} =req.author
    const book = await Book.findOne({ name: req.body.name });
    if (!book) {
      const books = new Book({
        name: req.body.name,
        isPublished: req.body.isPublished,
        datePublished: req.body.datePublished,
        serialNumber: req.body.serialNumber,
      });
      const createbook = await books.save();
      if (createbook) {
        return res
          .status(200)
          .json({ message: "Book created successfully", createbook });
      }
      }
     
        return res.status(400).json({ Error: "Book already exist" });

  } catch (error) {
    return res.status(500).json({
      Error: "internal server error",
      route: "/createbook",
    });
  }
};

export const getBook = async (req:Request, res:Response) =>{
    try {
        const books = await Book.find({})
            res.status(200).render('index', {books:books})
        
    } catch (err) {
         res.status(500).json({
            err: "internal server error",
            route: '/getbook'
          }); 
        
    }
  
}
 export const getOne = async (req: Request, res: Response) =>{
    try {
        const id = req.params.id
        const getOneBook = await Book.findById(id)
        return res.status(200).json({
            message:"Book retrived successfully",getOneBook
        })
    } catch (error) {
        return res.status(500).json({
            Error: "internal server error",
            route: '/getbook/:id'
          }); 
        
    }
 }

 export const updateBook= async(req: Request, res:Response) =>{
try{
    const id =req.params.id
    const update={
        name: req.body.name,
        isPublished: req.body.isPublished,
        datePublished: req.body.datePublished,
        serialNumber: req.body.serialNumber,

    }

    const updateOne = await Book.findByIdAndUpdate(id, {$set:update})
    if(updateOne){
        return res.status(200).json({
            message:"Book updated successfully", updateOne
        })
    }
  return res.status(400).json({
    Error:"Book not updated"
  })

} catch(error){
    return res.status(500).json({
        Error: "internal server error",
        route: '/updatebook/:id'
      }); 
}
 }

 export const deleteBook = async (req:Request, res:Response)=>{
    try {
        const id = req.params.id
        const deleted = await Book.findByIdAndDelete(id)
        if(deleted){
            return res.status(200).json({
                message:"Book deleted successfully"
            })
        }
        return res.status(400).json({
            Error:"Error deleting book"
        })
    } catch (error) {
        return res.status(500).json({
            Error: "internal server error",
            route: '/deletebook/:id'
          });    
    }

 }
