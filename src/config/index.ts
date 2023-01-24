import dotenv from "dotenv"
dotenv.config()

export const accountSid = process.env.AccountSID 
export const authToken = process.env.Authtoken 
export const fromadminphone = process.env.fromAdminPhone

export const GMAIL_USER=process.env.GMAIL_USER
export const GMAIL_PASS=process.env.GMAIL_PASS
export const FromAdminMail=process.env.FromAdminMail as string
export const userSubject=process.env.userSubject as string
export const APP_SECRET=process.env.APP_SECRET! 