import {Request, Response, NextFunction} from "express";
import {CustomError} from "../../../types";

export const logout = async (req: Request, res: Response, next:NextFunction) => {
    try {
        res.cookie("refreshToken", "", {maxAge: 0, httpOnly: true, secure: true});
        res.status(200).json({success: true, message: "Successfully Logged out"});
    }catch (err) {
         const error = new CustomError("Error logging out", 500);
         next(error)
    }
}