import { Request, Response, NextFunction } from "express";
import { authSchema } from "../../schemas";
import { CustomError } from "../../../types";
import { login } from "../../services/auth";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../constants";

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
    const {id, accessToken, refreshToken} = result;

    res.cookie(ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      secure: true,
      path: "/",
    })

    res.cookie(REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      secure: true,
      path: "/",
    })
    res.status(200).json({success: true, message: "Login Successful", id});
  } catch (error) {
    next(error);
  }
};
