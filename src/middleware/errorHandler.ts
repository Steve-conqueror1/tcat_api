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
