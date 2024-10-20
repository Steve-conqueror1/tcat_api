import {Request, Response, NextFunction} from "express";

export const undefinedRoute = async (req:Request, res: Response, next: NextFunction) => {
 res.status(404).json({success: false, message: "The requested endpoint does not exist"})
}