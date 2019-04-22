// ProjectName: express_01
// FileName: index.ts
// 作者：区区电脑
// createTime: 2019/4/22

import * as express from 'express';
import { IRoute, Router} from "express-serve-static-core";
import { connection } from "../dbModes/index";
import { User } from "../dbModes/User";

let router:Router = express.Router();
router.post('/add-user', async (req, res, next) => {


    let params = req.body;
    if (params.name && params.age && params.sign) {
        let con = await connection();
        let user:User = new User();
        user.name = params.name;
        user.age = params.age;
        user.sign = params.sign;

        con.manager.save(user).then(async (u:User) => {
            let users = await User.find();
            con.close();
            res.json({
                status: 'success',
                code: '000',
                result: users,
                message: '成功'
            })
        })
    } else {
        res.json({
            status: 'error',
            code: '001',
            result: null,
            message: '请补全信息'
        })
    }

});

module.exports = router;
