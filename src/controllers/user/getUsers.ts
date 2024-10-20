import  {Request, Response, NextFunction} from "express";
import {prisma} from "../../prisma";

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await prisma.user.findMany();
    res.status(200).json(users)
}