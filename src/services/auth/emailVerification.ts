import { decrypt } from "../../utils/confirmation";
import { prisma } from "../../prisma";
import { CustomError } from "../../../types";

export const emailVerification = async (confirmationToken: string) => {
  try {

    if(!confirmationToken){
      throw new CustomError("Invalid verification", 409)
    }
    const email = decrypt(confirmationToken);


    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user?.isConfirmed) {
      throw new CustomError("Your account is already verified", 409);
    }

    if (user) {
      await prisma.user.update({
        where: { email: email },
        data: {
          isConfirmed: true,
        },
      });

      return { success: true, message: "Your account verified successifully" };
    } else {
      throw new CustomError("User not found", 409);
    }
  } catch (err) {
    if (err instanceof CustomError) {
      throw err;
    }
    throw new CustomError(
      "Account can't be verified, Contact the administrator",
      500
    );
  }
};
