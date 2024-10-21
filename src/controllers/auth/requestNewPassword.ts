import {Request, Response, NextFunction} from "express";
import  {requestNewPasswordSchema} from "../../schemas";
import { CustomError } from "../../../types";
import { requestPasswordReset } from "../../services/auth";


export const requestNewPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {email} = req.body;

    const {error: validationError} = requestNewPasswordSchema.validate({email});

    if(validationError){
         const error = new CustomError(validationError.details[0].message, 422);
         next(error);
    }

  const result = await requestPasswordReset(email)

     res.status(200).json({success: true, ...result})
  }catch (err) {
    next(err)
  }
}