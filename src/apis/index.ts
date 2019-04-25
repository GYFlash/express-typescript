// ProjectName: express_01
// FileName: index.ts
// 作者：区区电脑
// createTime: 2019/4/22

import * as express from 'express';
import { Router } from "express-serve-static-core";
import { JsonResponse } from "../common/common";
import { UserController } from "../controller/UserController";

let router:Router = express.Router();

//// 用户注册
router.post('/register', async (req, res) => {
    let params = req.body;
    let userController = new UserController();
    let jsonResponse:JsonResponse = await userController.userRegister(params);
    res.json(jsonResponse);
});

//// 用户登录
router.post('/login', async (req, res) => {
    let params = req.body;
    let userController = new UserController();
    let jsonResponse:JsonResponse = await userController.userLogin(params);
    res.json(jsonResponse);
});

//// 用户列表查询
router.post('/getUsers', async (req, res) => {
    let userController = new UserController();
    let jsonResponse:JsonResponse = await userController.userGetAll();
    res.json(jsonResponse);
});

module.exports = router;
