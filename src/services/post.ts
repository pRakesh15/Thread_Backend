import {prismaClient} from "../lib/db"

export interface CreatePostPayload{
    titel: string,
     content: string
}

class PostService{
  public static createPost(payload:CreatePostPayload){
    const {content,titel}=payload;

    return prismaClient.post.create({
        data:{
            content,
            titel
        }
    });
  }
}

export default PostService;