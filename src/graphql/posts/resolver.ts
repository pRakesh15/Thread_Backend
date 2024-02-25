import { prismaClient } from "../../lib/db";

 const queries={

 };
//mutation is a graphQl part
 const mutations={
    //createUser function totaly based on prisma
    createPost: async (_:any,
        { titel, content }
            :
            { titel: string; content: string;}) => {
    await prismaClient.post.create({
        data:{
           titel,
           content
        },
    });
    return "post created successfully";
    },
 };

 export const resolvers={queries,mutations};