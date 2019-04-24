// ProjectName: express_01
// FileName: index.ts
// 作者：区区电脑
// createTime: 2019/4/22

import * as express from 'express';
import { IRoute, Router} from "express-serve-static-core";
import { connection } from "../models/index";
import { User } from "../models/User";
import { Token, TokenResult } from "../common/common";

let router:Router = express.Router();

//// 用户注册
router.post('/add-user', async (req, res, next) => {

    let params = req.body;
    if (params.userName && params.password) {
        let con = await connection();
        let user:User|undefined = await User.findOne({name:params.userName});
        if (user) {
            res.json({
                status: 'error',
                code: '001',
                result: null,
                message: '用户已存在'
            })
            con.close();
        } else {
            let newUser:User = new User();
            newUser.name = params.userName;
            newUser.password = params.password;

            con.manager.save(newUser).then(async (u:User) => {
                con.close();
                res.json({
                    status: 'success',
                    code: '000',
                    result: u,
                    message: '注册成功'
                })
            }).catch(() => {
                con.close();
                res.json({
                    status: 'error',
                    code: '001',
                    result: null,
                    message: '注册失败'
                })
            })
        }
    } else {
        res.json({
            status: 'error',
            code: '001',
            result: null,
            message: '请补全信息'
        })
    }
});
//// 用户登录
router.post('/login', async (req, res, next) => {
    let params = req.body;
    if (params.userName && params.password) {
        let con = await connection();
        // let user:User = new User();
        let user:User|undefined = await User.findOne({name: params.userName});
        if (!user) {
            res.json({
                status: 'error',
                code: '001',
                result: null,
                message: '用户不存在'
            })
            con.close();
        } else {
            if (user.password !== params.password) {
                res.json({
                    status: 'error',
                    code: '001',
                    result: null,
                    message: '密码错误'
                })
                con.close();
            } else {
                let token = Token.create({
                    name: user.name,
                    id: user.id
                });
                user.token = token;
                res.setHeader('token', token);
                res.json({
                    status: 'success',
                    code: '000',
                    result: user,
                    message: '成功'
                 })
                con.close();
            }
        }
    } else {
        res.json({
            status: 'error',
            code: '001',
            result: null,
            message: '请补全信息'
        })
    }
});

//// 用户列表查询
router.post('/getUsers', async (req, res, next) => {
    let con = await connection();
    let users = await User.find();
    con.close();
    res.json({
        status: 'success',
        code: '000',
        result: users,
        message: '查询成功'
    })

});

module.exports = router;
