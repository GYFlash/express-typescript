// FileName: AdminViews.ts
// ProjectName: express-typescript
// 作者：区区电脑
// createTime: 2019/4/23

import * as express from 'express';
import { Router } from "express-serve-static-core";

const router:Router = express.Router();

//// 首页
router.get('/', (req, res) => {
    res.render('admin/index', {
        title: 'Welcome to express admin'
    })
});

//// 注册
router.get('/register', async (req, res) => {
    res.render('admin/register', {
        title: '注册'
    })
});

//// 登录
router.get('/login', (req, res) => {
    res.render('admin/login', {title: '登录'})
});

module.exports = router;
