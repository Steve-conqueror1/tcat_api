import { Request, Response, NextFunction } from "express";
import { CustomError } from "../../../types";
import { prisma } from "./../../prisma";
import { decrypt } from "./../../utils/confirmation";

const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { confirmationToken } = req.params;
    const email = decrypt(confirmationToken);
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      user.isConfirmed = true;

      const {
        isConfirmed,
        id,
        role,
        email: userEmail,
      } = await prisma.user.update({
        where: { email: email },
        data: {
          isConfirmed: true,
        },
      });
      res.status(201).json({
        message: "User verified successfully",
        data: { isConfirmed, id, role, email: userEmail },
      });
    } else {
      throw new CustomError("User not found", 409);
    }
  } catch (err) {
    if (err instanceof CustomError) {
      throw err;
    }
    throw new CustomError("Verification Error", 500);
  }
};
