import express from "express";
import { ApolloServer } from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';
const app=express();
app.use(express.json());
//creating a graphql server
async function init() {
    const graphqlServer=new ApolloServer({
        //here type defination is a sechema..
        typeDefs:`
        type Query{
            hello:String
            say(name:String):String
        }
        `,
        resolvers:{
            Query:{
                hello:()=>`hy im a graph ql server`,
                say:(_,{name}:{name:string})=>`Hey ${name} How are you`
            }
        }
    })
    
    //start the graphQl server
    await graphqlServer.start();
    
    app.get("/",(req,res)=>
    {
        res.json({
            success:true,
            message:"Jay Shree RAM"
        });
    });
    
    app.use("/graphql",expressMiddleware(graphqlServer));
    
    app.listen(8080,()=>
    {
        console.log(`server started at port 8080`);
    })
}
init();