import { prismaClient } from "../../lib/db";
import UserService, { CreateUserPayload, GetUserTokenPayload } from "../../services/user";

 const queries={
    getUserToken:async(_:any,payload:GetUserTokenPayload)=>{
        const token=await UserService.getUserToken({
            email:payload.email,
            password:payload.password
        });
        return token;
    }
 };
//mutation is a graphQl part
 const mutations={
    //createUser function totaly based on prisma
    createUser: async (_:any,payload:CreateUserPayload) => {
        const res=await UserService.createUser(payload);
   
    return res.id;
    },
 };

 export const resolvers={queries,mutations};