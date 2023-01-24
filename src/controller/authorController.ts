import { Request, Response } from "express";
import Author, { AuthorInstance } from "../model/authorModel";
import { JwtPayload } from "jsonwebtoken";
import { stringify } from "querystring";
import { any } from "joi";
import { FromAdminMail, userSubject } from "../config";
import { emailHtml, GenerateOtp, mailSent } from "../utils/notification";

import {
  GenerateSignature,
  option,
  validatePassword,
  verifySignature,
} from "../utils/utility";
import {
  registerSchema,
  GenerateSalt,
  GeneratePassword,
  loginSchema,
} from "../utils/utility";

/*******================Register=======================****/
export const Register = async (req: Request, res: Response) => {
  try {
    const {
      author,
      dateRegistered,
      age,
      email,
      password,
      address,
      confirm_password,
    } = req.body;

    const validateResult = registerSchema.validate(req.body, option);
    if (validateResult.error) {
      return res
        .status(400)
        .json({ Error: validateResult.error.details[0].message });
    }
    //generate salt
    const salt = await GenerateSalt();
    const authorPassword = await GeneratePassword(password, salt);

    // generate otp and expiry
    const { otp, expiry } = GenerateOtp();
    console.log(otp, expiry);

    const authors = await Author.findOne({ email });
    if (!authors) {
      const createAuthor = await Author.create({
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
        otp_expiry:expiry

      });

      const html = emailHtml(otp);
      await mailSent(FromAdminMail, email, userSubject, html);

      const newauthor = (await Author.findOne({
        email,
      })) as unknown as AuthorInstance;
      // Generte signature
      let signature = await GenerateSignature({
        _id: newauthor._id,
        email: newauthor.email,
        verified: newauthor.verified,
      });
      return res.status(201).json({
        message:
          "Author created successfully, check your email or phone number for otp verification",
        signature,
        verified: newauthor.verified,
      });
      return res.status(201).render('dashboard')
    }
    return res.status(400).json({
      message: "author already exists",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ Error: " Internal server error", route: "/creatauthor" });
  }
};
//Logic to Verify users
export const verifyAuthor = async (req: JwtPayload, res: Response) => {
  try {

    const token = req.params.signature;
    const decode = await verifySignature(token);
    const { _id, email, verified } = decode as JwtPayload;
    const verifyAuth = await Author.findOne({ email });
    
    if (verifyAuth) {
      //Collecting user's Otp
      const { otp } = req.body;
      if (
        verifyAuth.otp === parseInt(otp) &&
        verifyAuth.otp_expiry >= new Date()
      ) {
        const toBeUpdated = {
          verified: true,
        };
        console.log(verifyAuth);
        const updatedAuthor = (await Author.findByIdAndUpdate(_id, {
          $set: toBeUpdated,
        })) as unknown as AuthorInstance;
        //Generating a new signature for the user
        let signature = await GenerateSignature({
          _id: updatedAuthor._id,
          email: updatedAuthor.email,
          verified: updatedAuthor.verified,
        });
        //201 is for created successfully
        if (updatedAuthor) {
          const verifyAuth = (await Author.findOne({
            email,
          })) as unknown as AuthorInstance;
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
  } catch (error) {
    res.status(500).json({
      Error: "Internal server Error",
      route: "/verify/verifyAuthor ",
    });
  }
};
// login
export const Login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const validateResult = loginSchema.validate(req.body, option);
    
    if (validateResult.error) {
      return res.status(400).json({
        Error: validateResult.error.details[0].message,
      });
    }
    const loginAuthor = (await Author.findOne({
      email,
    })) as unknown as AuthorInstance;
  
    if (loginAuthor.verified) {
      console.log(loginAuthor.verified);
      const validation = await validatePassword(
        password,
        loginAuthor.password,
        loginAuthor.salt
      ); //compare the entered password and the one in database as well as salt
  
      if (validation) {
        // if details match, generate new signature for him/her
        const signature = await GenerateSignature({
          _id: loginAuthor._id,
          email: loginAuthor.email,
          verified: loginAuthor.verified,
        });
        console.log(validation)
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
  } catch (err) {
    res.status(500).json({
      Error: "Internal server Error",
      route: "/user/login",
    });
  }
};
