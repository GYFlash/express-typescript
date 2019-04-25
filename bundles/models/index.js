"use strict";
// ProjectName: express_01
// FileName: index.ts
// 作者：区区电脑
// createTime: 2019/4/22
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let connection = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve, reject) => {
            typeorm_1.createConnection({
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "root",
                password: "root",
                database: "test",
                charset: "utf8",
                entities: [
                    User_1.User
                ],
                synchronize: true
            }).then(connection => {
                resolve(connection);
            }).catch(error => {
                console.error(error);
                resolve();
            });
        });
    });
};
exports.connection = connection;
//# sourceMappingURL=index.js.map