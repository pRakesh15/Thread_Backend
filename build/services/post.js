"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../lib/db");
class PostService {
    static createPost(payload) {
        const { content, titel } = payload;
        return db_1.prismaClient.post.create({
            data: {
                content,
                titel
            }
        });
    }
}
exports.default = PostService;
