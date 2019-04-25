// FileName: BaseController.ts
// ProjectName: express-admin
// 作者：区区电脑
// createTime: 2019/4/25

import { Connection } from "typeorm";
import { connection } from "../models";
import { JsonResponse } from "../common/common";

export class BaseController {

    protected jsonResponse:JsonResponse | undefined;

    constructor () {}

    /**
     * 开启数据库连接
     * @private
     */
    protected async _connectionOpen() {
        return await new Promise<Connection>(async (resolve) => {
            let con:Connection = await connection();
            if (con) {
                resolve(con);
            } else {
                resolve();
            }
        });
    }
}
