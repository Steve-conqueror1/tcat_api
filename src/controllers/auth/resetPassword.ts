import {Request, Response, NextFunction } from "express";
import { changePassword } from "../../services/auth/changePassword";
import { CustomError } from "../../../types";

export const resetPassword = async (req:Request, res: Response, next:NextFunction) =>{
  try {
    const { token } = req.query
    const {password} = req.body

    if(!token){
      throw new CustomError("No token provided", 400)
    }

    await changePassword(token as string, password)
    res.status(200).json({success: true, message: "Password reset successful"})
  }catch (err) {
     next(err)
  }
}