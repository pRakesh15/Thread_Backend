"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mutation_1 = require("./mutation");
const queries_1 = require("./queries");
const resolver_1 = require("./resolver");
const typedef_1 = require("./typedef");
exports.Post = { typeDefs: typedef_1.typeDefs, mutations: mutation_1.mutations, queries: queries_1.queries, resolvers: resolver_1.resolvers };
