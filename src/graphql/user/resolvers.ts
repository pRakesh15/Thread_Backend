import { prismaClient } from "../../lib/db";

 const queries={

 };
//mutation is a graphQl part
 const mutations={
    //createUser function totaly based on prisma
    createUser: async (_:any,
        { firstName, lastName, email, password }
            :
            { firstName: string; lastName: string; email: string; password: string }) => {
    await prismaClient.user.create({
        data:{
            email,
            firstName,
            lastName,
            password,
            salt:'random_salt',
        },
    });
    return "don";
    },
 };

 export const resolvers={queries,mutations};