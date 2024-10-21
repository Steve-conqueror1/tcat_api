import { Request, NextFunction, Response } from "express";
import { AccessTokenPayload, CustomError } from "../../types";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants";

export const jwtAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.accessToken;
  try {
    if(!token){
      throw new CustomError("You aren't Authenticated", 401)
    }

    jwt.verify(token, JWT_SECRET, (err: any, data: any) => {
      if(err) {
        throw new CustomError("Token verification failed", 403)
      }
      (req as any).user = data as AccessTokenPayload
      next()
    })
  }catch (err) {
    next(err)
  }
}