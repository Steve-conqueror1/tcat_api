import {prisma} from "../../prisma";

export const removeUser =  async  (userId:  string) => {
   const user = await prisma.user.delete({where:{
        id: userId
        }})
}

