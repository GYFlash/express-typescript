"use strict";
// ProjectName: express_01
// FileName: index.ts
// 作者：区区电脑
// createTime: 2019/4/22
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
let connection = function () {
    return new Promise((resolve, reject) => {
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
            reject(false);
        });
    });
};
exports.connection = connection;
//# sourceMappingURL=index.js.map