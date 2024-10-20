import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { register } from "../../services/auth";
import { userSchema } from "./../../schemas";
import { CustomError } from "../../../types";
import {welcomeTemplate} from "../../emailTemplates";


import { encrypt } from "./../../utils/confirmation";
import { string } from "joi";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
    const INFORMER_API = process.env.INFORMER_API as string;
    const CLIENT_URL = process.env.CLIENT_URL as string;
  try {
    const { error: validationError } = userSchema.validate(body);
     const confirmationToken = encrypt(body.email);

    if (validationError) {
      const error = new CustomError(validationError.details[0].message, 422);
      next(error);
    }

    const result = await register(body);
    const redirectionUrl = `${CLIENT_URL}/confirmation/${confirmationToken}`;

    await axios.post(`${INFORMER_API}/sendEmail`, {
      from: "TCAT",
      address: "TCAT <hr@TreasureChestAdventureTours.com>",
      to:  result.email,
      subject: "Welcome to TCAT",
      template: welcomeTemplate({redirectionUrl}),
    }).catch(err => {
     throw new CustomError("Error Sending email", 500)
    });

    res.status(201).json({success: false, message: "User registered"})
  } catch (err) {
    if (err instanceof Error) {
      next(err);
    }

    throw new CustomError("Registration error", 500);
  }
};
