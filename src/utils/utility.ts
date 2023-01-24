import Joi from "joi"
import bcrypt from "bcrypt"
import jwt, { Jwt, JwtPayload } from "jsonwebtoken"
import { Authpayload } from "../interface"
import { APP_SECRET } from "../config"

/**================Joi validation================**/
export const registerSchema = Joi.object().keys({
    author: Joi.string().required(),
    dateRegistered: Joi.string(),
    age: Joi.number(),
    email: Joi.string().required(),
    address: Joi.string(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    confirm_password: Joi.any().equal(Joi.ref('password')).required().label('Confirm password').messages({'any.only':'{{#label}} does not match'})
})

export const option = {
    abortEarly:false,
    errors:{
        wrap:{
            label:''
        }
    }
}
/**================ salt and bcrypt(password hashing) validation================**/
export const GenerateSalt = async()=>{
    return await bcrypt.genSalt()
}
export const GeneratePassword = async(password:string, salt:string) =>{
    return await bcrypt.hash(password, salt)
 }
 export const GenerateSignature = async (payload:Authpayload) => {
    return jwt.sign(payload,APP_SECRET,{expiresIn:'1d'})
 }

 export const verifySignature = async(signature:string) =>{
    return jwt.verify(signature, APP_SECRET) as JwtPayload
 }

 /**======================= login author========================**/
 export const loginSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))

 })
 // validate password
export const validatePassword = async( enteredPassword:string,savedPassword:string, salt:string)=>{
    return await bcrypt.hash(enteredPassword, salt)=== savedPassword
}