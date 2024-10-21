import jwt from "jsonwebtoken";
import { CLIENT_URL, INFORMER_API, JWT_SECRET } from "../../constants";
import { encrypt } from "../../utils/confirmation";
import { prisma } from "../../prisma";
import { CustomError } from "../../../types";
import axios from "axios";
import { welcomeTemplate } from "../../emailTemplates";
import { resetPassword } from "../../emailTemplates/reset-password";

export const requestPasswordReset = async (email: string)=>{
  try {
    const user = prisma.user.findUnique({where: {
      email
      }})

    if(!user){
      throw  new CustomError("No user associated with this email", 400)
    }

    const token = jwt.sign({email}, JWT_SECRET!, {expiresIn: "1h"})
    const confirmationToken = encrypt(token);
    const resetLink = `${CLIENT_URL}/reset-password?token=${confirmationToken}`;

    await axios.post(`${INFORMER_API}/sendEmail`, {
      from: "TCAT Team",
      address: "TCAT <admin@TreasureChestAdventureTours.com>",
      to:  email,
      subject: "Reset Password",
      template: resetPassword({resetLink}),
    }).catch(err => {
     throw new CustomError("Error Sending email", 500)
    });
    return {
      message: "Find instructions in your email to reset password"
    }
  }catch (err) {
   if(err instanceof  CustomError){
     throw err
   }else {
     throw new CustomError("Error resetting password", 400)
   }
  }
}