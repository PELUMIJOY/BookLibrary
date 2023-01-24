import mongoose, {Schema} from "mongoose";


export interface AuthorInstance{
      _id:string,
      author: string,
      dateRegistered: string,
      age: Number,
      email:string,
      password:string,
      address: string,
      salt:string,
      verified: boolean,
      role:string,
      coverImage:string,
      otp:number,
      otp_expiry:Date
}

const authorSchema = new Schema({
    author: {type:String},
    dateRegistered:{type:String},
    age: {type:Number},
    email: {type:String, required:true},
    password: {type:String, required:true},
    address: {type:String},
    salt:{type: String},
    verified:{type:Boolean},
    role: {type: String},
    coverImage:{type:String},
    otp:{type:Number},
    otp_expiry:{type:Date}
},{
    timestamps:true
})

const Author = mongoose.model<AuthorInstance>("Author", authorSchema)

export default Author