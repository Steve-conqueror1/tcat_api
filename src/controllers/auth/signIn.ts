import { Request, Response, NextFunction } from "express";
import { authSchema } from "./../../schemas";
import { CustomError } from "../../../types";
import { login } from "./../../services/auth/login";

export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;

  try {
    const { error: validationError } = authSchema.validate(body);

    if (validationError) {
      const error = new CustomError(validationError.details[0].message, 422);
      next(error);
    }

    const result = await login(body);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
