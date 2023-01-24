"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APP_SECRET = exports.userSubject = exports.FromAdminMail = exports.GMAIL_PASS = exports.GMAIL_USER = exports.fromadminphone = exports.authToken = exports.accountSid = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.accountSid = process.env.AccountSID;
exports.authToken = process.env.Authtoken;
exports.fromadminphone = process.env.fromAdminPhone;
exports.GMAIL_USER = process.env.GMAIL_USER;
exports.GMAIL_PASS = process.env.GMAIL_PASS;
exports.FromAdminMail = process.env.FromAdminMail;
exports.userSubject = process.env.userSubject;
exports.APP_SECRET = process.env.APP_SECRET;
