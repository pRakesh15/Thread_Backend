import { prismaClient } from "../../lib/db";
import UserService, { CreateUserPayload, GetUserTokenPayload } from "../../services/user";

 const queries={
    //it is for fetch data...
    getUserToken:async(_:any,payload:GetUserTokenPayload)=>{
        const token=await UserService.getUserToken({
            email:payload.email,
            password:payload.password
        });
        return token;
    },
    getCurrentLoggedInUser:async(_:any,parameters:any,context:any)=>{
        if(context && context.user)
        {
            const id=context.user.id
            const user=await UserService.getUserByid(id)
            return user;
        }
        throw new Error("i dont know who is the user")
    }
 };
//mutation is a graphQl part for create somthing for databases
 const mutations={
    //createUser function totaly based on prisma
    createUser: async (_:any,payload:CreateUserPayload) => {
        //here we use some function of service layer....
        const res=await UserService.createUser(payload);
   
    return res.id;
    },
    
 };

 export const resolvers={queries,mutations};