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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGraphqlServer = void 0;
const server_1 = require("@apollo/server");
const index_1 = require("./user/index");
const index_2 = require("./posts/index");
const createGraphqlServer = () => __awaiter(void 0, void 0, void 0, function* () {
    const graphqlServer = new server_1.ApolloServer({
        //here type defination is a sechema..
        typeDefs: `
        ${index_1.User.typeDefs}
        type Query{
           ${index_1.User.queries},
           ${index_2.Post.queries},
          
        }
        type Mutation{
            ${index_1.User.mutations},
            ${index_2.Post.mutations}
        }
        `,
        resolvers: {
            Query: Object.assign(Object.assign({}, index_1.User.resolvers.queries), index_2.Post.resolvers.queries),
            Mutation: Object.assign(Object.assign({}, index_1.User.resolvers.mutations), index_2.Post.resolvers.mutations)
        }
    });
    //start the graphQl server
    yield graphqlServer.start();
    return graphqlServer;
});
exports.createGraphqlServer = createGraphqlServer;
