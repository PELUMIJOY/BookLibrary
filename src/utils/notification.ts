import {
    accountSid,
    authToken,
    fromadminphone,
    GMAIL_PASS,
    GMAIL_USER,
    FromAdminMail,
    userSubject,
  } from "../config";
  import nodemailer from "nodemailer";
  import { string } from "joi";
  
  export const GenerateOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const expiry = new Date();
    expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
    return { otp, expiry };
  };
  // logic on how to send otp sms
  export const onRequestOtp = async (otp: number, toPhoneNumber: string) => {
    const client = require("twilio")(accountSid, authToken);
    const response = await client.messages.create({
      body: `Your OTP IS ${otp}`,
      from: fromadminphone,
      to: toPhoneNumber,
    });
    return response;
  };
  // send otp to email
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  // export const sendEmail = () => {
  
  // }
  // create function to help send mail
  export const mailSent = async (
    from: string,
    to: string,
    subject: string,
    html: string
  ) => {
    try {
      const response = await transport.sendMail({
        from: FromAdminMail,
        to,
        subject: userSubject,
        html,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  export const emailHtml = (otp: number): string => {
    let response = ` <div style="max-width:700px;
          margin:auto; border:10px solid #ddd; padding:50px 20px; font-size:110%;">
  
          <h2 style="text-align:center; text-transform:uppercase; color:teal;">
          Welcome to Lucy Library where reading is an habit and success is inevitable
          </h2>
  
          <p style="padding:50px; margin:2Opx;"> DO NOT DISCLOSE, verify your account with this  OTP ${otp}. It expires in 30minutes</p>
  
          </div>`;
    return response;
  };
  
  