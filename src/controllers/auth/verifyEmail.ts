import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../../types";
import { emailVerification } from "./../../services/auth/emailVerification";

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { confirmationToken } = req.params;

    const result = await emailVerification(confirmationToken);
    res.status(200).json(result);
  } catch (err) {
    if (err instanceof CustomError) {
      next(err);
    }
  }
};
