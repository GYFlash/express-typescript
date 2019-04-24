// FileName: adminViews.ts
// ProjectName: express-typescript
// 作者：区区电脑
// createTime: 2019/4/23

import * as express from 'express';
import { IRoute, Router } from "express-serve-static-core";
import { Token, TokenResult } from "../common/common";

const router:Router = express.Router();

// 首页
router.get('/', (req, res, next) => {
    res.render('admin/index', {
        title: 'Welcome to express admin'
    })
});

// 注册
router.get('/register', async (req, res, next) => {
    res.render('admin/register', {
        title: '注册'
    })
});

// 登录
router.get('/login', (req, res, next) => {
    res.render('admin/login', {title: '登录'})
});

module.exports = router;
