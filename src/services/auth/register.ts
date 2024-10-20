import argon2 from "argon2";
import { CustomError, UserType } from "../../../types";
import { prisma } from "./../../prisma";

export const register = async (user: UserType) => {
  const { password, ...userFields } = user;
  const hashedPassword = await argon2.hash(password);

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: userFields.email.toLocaleLowerCase() },
    });

    if (existingUser) {
      throw new CustomError("A user with this email already exists", 422);
    }

    const { email, role, id } = await prisma.user.create({
      data: {
        password: hashedPassword,
        email: userFields.email.toLocaleLowerCase(),
        role: userFields.role,
      },
    });

    return { email, role, id };
  } catch (error) {
    if (error instanceof CustomError) {
       throw error;
    }
    throw new CustomError("Registration Error", 500);
  }
};
