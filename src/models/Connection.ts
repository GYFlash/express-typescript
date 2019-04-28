// ProjectName: express_01
// FileName: Connection.ts
// 作者：区区电脑
// createTime: 2019/4/22

import 'reflect-metadata';
import {
    Connection,
    createConnection,
    getConnection,
} from "typeorm";

///// 开启默认链接
let connection:any = async function () {
    return new Promise<Connection>(async (resolve) => {
        try {
           let connect = getConnection();
           resolve(connect);
        } catch (e) {
            const connection = await createConnection({
                    type: "mysql",
                    host: "localhost",
                    port: 3306,
                    username: "root",
                    password: "root",
                    entityPrefix: 'express_',
                    database: 'test',
                    charset: "utf8",
                    entities: [__dirname + '/*{.js,.ts}'],
                    extra: {
                        connectionLimit:  10, // 连接池最大连接数量, 查阅资料 建议是  core number  * 2 + n
                    },
                    synchronize: true
                });
            resolve(connection);
        }
    })
};

export {connection};
