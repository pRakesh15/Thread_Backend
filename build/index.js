"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const db_1 = require("./lib/db");
const app = (0, express_1.default)();
app.use(express_1.default.json());
//creating a graphql server
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        const graphqlServer = new server_1.ApolloServer({
            //here type defination is a sechema..
            typeDefs: `
        type Query{
            hello:String
            say(name:String):String
        }
        type Mutation{
            createUser(firstName:String,lastName:String,email:String,password:String):Boolean
        }
        `,
            resolvers: {
                Query: {
                    hello: () => `hy im a graph ql server`,
                    say: (_, { name }) => `Hey ${name} How are you`
                },
                Mutation: {
                    createUser: (_, { firstName, lastName, email, password }) => __awaiter(this, void 0, void 0, function* () {
                        yield db_1.prismaClient.user.create({
                            data: {
                                email,
                                firstName,
                                lastName,
                                password,
                                salt: 'random_salt',
                            },
                        });
                        return true;
                    })
                }
            }
        });
        //start the graphQl server
        yield graphqlServer.start();
        app.get("/", (req, res) => {
            res.json({
                success: true,
                message: "Jay Shree RAM"
            });
        });
        app.use("/graphql", (0, express4_1.expressMiddleware)(graphqlServer));
        app.listen(8080, () => {
            console.log(`server started at port 8080`);
        });
    });
}
init();
