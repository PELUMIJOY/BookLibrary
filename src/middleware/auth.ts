import { Request, Response, NextFunction } from "express";
import jwt, {JwtPayload} from "jsonwebtoken"
import { APP_SECRET } from "../config";
import Author, {AuthorInstance} from "../model/authorModel";

//Either you use req.cookies or req.headers
export const auth = async (req: JwtPayload, res: Response, next: NextFunction) => {
    try {
        const authorization = req.headers.authorization //targetting the authorization header to extract the token
        //Or use req.cookie.jwt to get the token
        if(!authorization){
            return res.status(401).json({
                Error: "Unauthorized, kindly signin"
            })
        }
        //Making sure that the token is attached to bearer
        const token = authorization.slice(7, authorization.length) //Extracting the token from the authorization header
        let verified = jwt.verify(token, APP_SECRET)
        if(!verified){
            return res.status(401).json({
                Error: "Unauthorized, kindly signin"
            })
        }
        // const id = verified.id!
        const {_id} = verified as {[key:string]:string} //Like an interface
        const user = await Author.findOne({ _id: _id });
        if(!user){
            return res.status(401).json({
                Error: "Unauthorized, kindly signin"
            })
        }
            req.user = verified
        next()
    } catch(err){
        return res.status(401).json({
            Error: "Unauthorized"
        })
    }
}