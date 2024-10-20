import {Request, Response,NextFunction} from "express";
import {removeUser} from "../../services/users/removeUser";

export const deleteUser =async (req:Request, res:Response, next: NextFunction) => {
    const {userId} = req.params;
    try {
        await removeUser(userId)
        res.status(200).json({message: "User deleted successfully"})
    }catch (e) {
      console.log(e)
    }
}