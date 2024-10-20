import { Auth, CustomError } from "../../../types";
import { prisma } from "./../../prisma";
import { verify } from "argon2";
import jwt from "jsonwebtoken";

export const login = async (auth: Auth) => {
  const { email, password } = auth;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email.toLocaleLowerCase() },
    });

    if (!user) {
      throw new CustomError("Login error, please try again", 400);
    }

    const passwordMatch = await verify(user.password, password);

    if (!passwordMatch) {
      throw new CustomError("Login error, Please try again", 400);
    }

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.TOKEN_SECRET_KEY || "",
      { expiresIn: "2h" }
    );

    return { id: user.id, email: user.email, role: user.role, token };
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError("Login error", 500);
  }
};
