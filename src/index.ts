import express from "express";
import { expressMiddleware } from '@apollo/server/express4';
import { createGraphqlServer } from "./graphql";
import UserService from "./services/user";
const app = express();
app.use(express.json());
//creating a graphql server
async function init() {
  

    app.get("/", (req, res) => {
        res.json({
            success: true,
            message: "Jay Shree RAM"
        });
    });
    app.use("/graphql", expressMiddleware(await createGraphqlServer(),{
        context:async ({req})=>{
            //@ts-ignore
           const token=req.headers["token"]

           try{
            const user=UserService.decodeJWTToken(token as string);
            return {user};
           } catch(error)
           {
            return{}
           }
        }
    }));

    app.listen(8080, () => {
        console.log(`server started at port 8080`);
    })
}
init();