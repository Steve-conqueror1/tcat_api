import { CustomError } from "../../../types";
import { decrypt } from "../../utils/confirmation";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../constants";
import { prisma } from "../../prisma";
import argon2 from "argon2";

export const changePassword = async (confirmationHash: string, password: string) => {

  try {
    if(!confirmationHash){
      throw new CustomError("Invalid verification", 409)
    }
    const confirmationToken = decrypt(confirmationHash);
    const decoded = jwt.verify(confirmationToken, JWT_SECRET!)

   const {email} =decoded as {email: string}
    const hashedPassword = await argon2.hash(password);

    const user = await prisma.user.update({
      where: {email: email as string},
      data: {
        password: hashedPassword
      }
    })
  }catch (err) {
    throw err
  }
}