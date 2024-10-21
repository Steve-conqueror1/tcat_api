import {Request, Response, NextFunction, json} from "express";
import {CustomError } from "../../../types";
import jwt from "jsonwebtoken"

import { ACCESS_TOKEN, JWT_SECRET } from "../../constants";

export const refreshToken = async (req:Request, res:Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      if(!refreshToken){
          throw new CustomError("You are not logged in", 401)
      }

      jwt.verify(refreshToken, JWT_SECRET, (err: any, payload: any) => {
          if(err){
              throw new CustomError("Forbidden, token verification failed", 403);
          }
         const newAccessToken = jwt.sign({userId: payload.id, email: payload.email, role:payload.role}, JWT_SECRET, {expiresIn: "15m"})
             res.cookie(ACCESS_TOKEN, newAccessToken, {
              httpOnly: true,
              secure: true,
              path: "/",
            })
          res.status(200).json({success: true, message: "A new Access token created"})
      });
    }catch (err) {
      next(err)
    }
}