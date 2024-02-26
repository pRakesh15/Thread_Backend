import { prismaClient } from "../../lib/db";
import  PostService, { CreatePostPayload } from "../../services/post";

 const queries={

 };
//mutation is a graphQl part
 const mutations={
    //createUser function totaly based on prisma
    createPost: async (_:any,payload:CreatePostPayload) => {
    const res=await PostService.createPost(payload)
    return res.id
    },
 };

 export const resolvers={queries,mutations};