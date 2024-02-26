import { ApolloServer } from "@apollo/server";
import {User} from './user/index'
import { Post } from "./posts/index";
export const createGraphqlServer=async()=>
{
    const graphqlServer = new ApolloServer({
        //here type defination is a sechema..
        typeDefs: `
        ${User.typeDefs}
        type Query{
           ${User.queries},
           ${Post.queries},
          
        }
        type Mutation{
            ${User.mutations},
            ${Post.mutations}
        }
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries,
                ...Post.resolvers.queries,
            },
            Mutation: {
              ...User.resolvers.mutations,
              ...Post.resolvers.mutations,
            }
        }
    })

    //start the graphQl server
    await graphqlServer.start();

    return graphqlServer;
}