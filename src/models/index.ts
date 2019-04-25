// ProjectName: express_01
// FileName: index.ts
// 作者：区区电脑
// createTime: 2019/4/22

import 'reflect-metadata';
import {Connection, createConnection} from "typeorm";
import { User } from './User';

let connection:any = async function () {
    return await new Promise<Connection>((resolve) => {
        createConnection({
            type: "mysql",
            host: "localhost",
            port: 3306,
            username: "root",
            password: "root",
            database: "test",
            charset: "utf8",
            entities: [
                User
            ],
            synchronize: true
        }).then(connection => {
            resolve(connection);
        }).catch( error => {
            console.error(error);
            resolve();
        })
    })
};

export {connection};
