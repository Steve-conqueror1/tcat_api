import { Request, Response, ErrorRequestHandler, NextFunction } from "express";

export const errorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const messsage = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    messsage,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

export const notFountHandler = async (req:Request, res: Response, next: NextFunction) => {
 res.status(404).json({success: false, message: "The requested api endpoint does not exist"})
}
