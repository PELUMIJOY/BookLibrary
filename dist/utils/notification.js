"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emailHtml = exports.mailSent = exports.onRequestOtp = exports.GenerateOtp = void 0;
const config_1 = require("../config");
const nodemailer_1 = __importDefault(require("nodemailer"));
const GenerateOtp = () => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const expiry = new Date();
    expiry.setTime(new Date().getTime() + 30 * 60 * 1000);
    return { otp, expiry };
};
exports.GenerateOtp = GenerateOtp;
// logic on how to send otp sms
const onRequestOtp = (otp, toPhoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    const client = require("twilio")(config_1.accountSid, config_1.authToken);
    const response = yield client.messages.create({
        body: `Your OTP IS ${otp}`,
        from: config_1.fromadminphone,
        to: toPhoneNumber,
    });
    return response;
});
exports.onRequestOtp = onRequestOtp;
// send otp to email
const transport = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: config_1.GMAIL_USER,
        pass: config_1.GMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,
    },
});
// export const sendEmail = () => {
// }
// create function to help send mail
const mailSent = (from, to, subject, html) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield transport.sendMail({
            from: config_1.FromAdminMail,
            to,
            subject: config_1.userSubject,
            html,
        });
        return response;
    }
    catch (error) {
        console.log(error);
    }
});
exports.mailSent = mailSent;
const emailHtml = (otp) => {
    let response = ` <div style="max-width:700px;
          margin:auto; border:10px solid #ddd; padding:50px 20px; font-size:110%;">
  
          <h2 style="text-align:center; text-transform:uppercase; color:teal;">
          Welcome to Lucy Library where reading is an habit and success is inevitable
          </h2>
  
          <p style="padding:50px; margin:2Opx;"> DO NOT DISCLOSE, verify your account with this  OTP ${otp}. It expires in 30minutes</p>
  
          </div>`;
    return response;
};
exports.emailHtml = emailHtml;
