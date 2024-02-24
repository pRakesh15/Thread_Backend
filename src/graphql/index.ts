import { ApolloServer } from "@apollo/server";
import {User} from './user/index'
export const createGraphqlServer=async()=>
{
    const graphqlServer = new ApolloServer({
        //here type defination is a sechema..
        typeDefs: `
        type Query{
           ${User.queries}
        }
        type Mutation{
            ${User.mutations}
        }
        `,
        resolvers: {
            Query: {
                ...User.resolvers.queries,
            },
            Mutation: {
              ...User.resolvers.mutations,
            }
        }
    })

    //start the graphQl server
    await graphqlServer.start();

    return graphqlServer;
}