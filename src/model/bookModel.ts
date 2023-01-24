import mongoose, {Schema}  from "mongoose";

interface bookInstance{
    _id:string
    bookName: string,
    isPublished: boolean,
    datePublished: string,
    serialNumber: number
}
 const bookSchema =new Schema({
    name: {type:String},
    isPublished: {type:Boolean},
    datePublished: {type:String},
    serialNumber: {type:Number}


 },{
    timestamps:true
 })

const Book = mongoose.model<bookInstance>("Book", bookSchema)

export default Book