import express,{Request, Response} from "express"
import mongoose from "mongoose"
import logger from "morgan" 
import bookRoutes from "./routes/bookroutes"
import authorRoutes from "./routes/authorRoutes"
import pagesRoutes from './routes/pages'
import dotenv from "dotenv"
import path from "path"

dotenv.config()

const app = (express())

app.use(express.json())
app.use(logger("dev"))




// view engine setup
app.set("views", path.join(__dirname, '..', "views"));

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, '..', 'public')))


app.use('/', pagesRoutes)
app.use('/books', bookRoutes)
app.use('/author', authorRoutes)



// app.get("/", (req:Request, res:Response)=>{
// res.json('Hello Woorld')
// })





mongoose.connect(process.env.DB_URL!, ()=>{
    console.log('Database connected successfully')
})

const PORT = 2300
app.listen(PORT, () =>{
console.log(`Server is listening to http://localhost:${PORT}`)
})

export default app