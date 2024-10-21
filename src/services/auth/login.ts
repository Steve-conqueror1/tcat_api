import { Auth, CustomError } from "../../../types";
import { prisma } from "./../../prisma";
import { verify } from "argon2";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../constants";

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


    const access_token_payload =   { userId: user.id, email: user.email, role:user.role }
    const refresh_token_payload =   { userId: user.id, email: user.email, role: user.role }

    const accessToken = jwt.sign(
       access_token_payload,
      JWT_SECRET!,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
        refresh_token_payload,
        JWT_SECRET!,
        {expiresIn: "1d"}
    );

    return { id: user.id, email: user.email, role: user.role, accessToken, refreshToken };
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    }
    throw new CustomError("Login error", 500);
  }
};
