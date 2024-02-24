"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mutation_1 = require("./mutation");
const queries_1 = require("./queries");
const resolvers_1 = require("./resolvers");
const typedef_1 = require("./typedef");
exports.User = { typeDefs: typedef_1.typeDefs, mutations: mutation_1.mutations, queries: queries_1.queries, resolvers: resolvers_1.resolvers };
