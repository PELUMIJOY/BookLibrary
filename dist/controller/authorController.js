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
exports.Login = exports.verifyAuthor = exports.Register = void 0;
const authorModel_1 = __importDefault(require("../model/authorModel"));
const config_1 = require("../config");
const notification_1 = require("../utils/notification");
const utility_1 = require("../utils/utility");
const utility_2 = require("../utils/utility");
/*******================Register=======================****/
const Register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { author, dateRegistered, age, email, password, address, confirm_password, } = req.body;
        const validateResult = utility_2.registerSchema.validate(req.body, utility_1.option);
        if (validateResult.error) {
            return res
                .status(400)
                .json({ Error: validateResult.error.details[0].message });
        }
        //generate salt
        const salt = yield (0, utility_2.GenerateSalt)();
        const authorPassword = yield (0, utility_2.GeneratePassword)(password, salt);
        // generate otp and expiry
        const { otp, expiry } = (0, notification_1.GenerateOtp)();
        console.log(otp, expiry);
        const authors = yield authorModel_1.default.findOne({ email });
        if (!authors) {
            const createAuthor = yield authorModel_1.default.create({
                author,
                dateRegistered,
                age,
                email,
                password: authorPassword,
                address,
                salt,
                verified: false,
                role: "author",
                otp,
                otp_expiry: expiry
            });
            const html = (0, notification_1.emailHtml)(otp);
            yield (0, notification_1.mailSent)(config_1.FromAdminMail, email, config_1.userSubject, html);
            const newauthor = (yield authorModel_1.default.findOne({
                email,
            }));
            // Generte signature
            let signature = yield (0, utility_1.GenerateSignature)({
                _id: newauthor._id,
                email: newauthor.email,
                verified: newauthor.verified,
            });
            return res.status(201).json({
                message: "Author created successfully, check your email or phone number for otp verification",
                signature,
                verified: newauthor.verified,
            });
            return res.status(201).render('dashboard');
        }
        return res.status(400).json({
            message: "author already exists",
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ Error: " Internal server error", route: "/creatauthor" });
    }
});
exports.Register = Register;
//Logic to Verify users
const verifyAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.params.signature;
        const decode = yield (0, utility_1.verifySignature)(token);
        const { _id, email, verified } = decode;
        const verifyAuth = yield authorModel_1.default.findOne({ email });
        if (verifyAuth) {
            //Collecting user's Otp
            const { otp } = req.body;
            if (verifyAuth.otp === parseInt(otp) &&
                verifyAuth.otp_expiry >= new Date()) {
                const toBeUpdated = {
                    verified: true,
                };
                console.log(verifyAuth);
                const updatedAuthor = (yield authorModel_1.default.findByIdAndUpdate(_id, {
                    $set: toBeUpdated,
                }));
                //Generating a new signature for the user
                let signature = yield (0, utility_1.GenerateSignature)({
                    _id: updatedAuthor._id,
                    email: updatedAuthor.email,
                    verified: updatedAuthor.verified,
                });
                //201 is for created successfully
                if (updatedAuthor) {
                    const verifyAuth = (yield authorModel_1.default.findOne({
                        email,
                    }));
                    return res.status(200).json({
                        message: "Author verified successfully",
                        signature,
                        verified: updatedAuthor.verified,
                    });
                }
            }
            return res.status(400).json({
                Error: "Otp is invalid or expired",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            Error: "Internal server Error",
            route: "/verify/verifyAuthor ",
        });
    }
});
exports.verifyAuthor = verifyAuthor;
// login
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const validateResult = utility_2.loginSchema.validate(req.body, utility_1.option);
        if (validateResult.error) {
            return res.status(400).json({
                Error: validateResult.error.details[0].message,
            });
        }
        const loginAuthor = (yield authorModel_1.default.findOne({
            email,
        }));
        if (loginAuthor.verified) {
            console.log(loginAuthor.verified);
            const validation = yield (0, utility_1.validatePassword)(password, loginAuthor.password, loginAuthor.salt); //compare the entered password and the one in database as well as salt
            if (validation) {
                // if details match, generate new signature for him/her
                const signature = yield (0, utility_1.GenerateSignature)({
                    _id: loginAuthor._id,
                    email: loginAuthor.email,
                    verified: loginAuthor.verified,
                });
                console.log(validation);
                return res.status(200).json({
                    message: "You have succesfully logged in",
                    signature,
                    email: loginAuthor.email,
                    verified: loginAuthor.verified,
                    role: loginAuthor.role,
                });
            }
        }
        return res.status(400).json({
            Error: "Wrong username or password or not a verified user",
        });
    }
    catch (err) {
        res.status(500).json({
            Error: "Internal server Error",
            route: "/user/login",
        });
    }
});
exports.Login = Login;
