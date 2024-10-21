import {Request, Response, NextFunction, json} from "express";
import {CustomError, RefreshTokenPayload} from "../../../types";
import jwt, {JsonWebTokenError, VerifyErrors} from "jsonwebtoken"
import process from "node:process";

export const refreshToken = async (req:Request, res:Response, next: NextFunction) => {
    try {
      const refreshToken = req.cookies.refreshToken;
      console.log("------refresh token-----", refreshToken);
      const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY || "";
      const REFRESH_TOKEN_SECRET_KEY =process.env.REFRESH_TOKEN_SECRET_KEY || "";

      if(!refreshToken){
          throw new CustomError("You are not logged in", 401)
      }

      jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY, (err: any, payload: any) => {
          if(err){
              throw new CustomError("Forbidden, token verification failed", 403);
          }
         const newAccessToken = jwt.sign({userId: payload.id, email: payload.email, role:payload.role}, ACCESS_TOKEN_SECRET_KEY, {expiresIn: "15m"})
          res.status(200).json({accessToken: newAccessToken})
      });





    }catch (err) {
      next(err)
    }
}