// ProjectName: express_01
// FileName: index.ts
// 作者：区区电脑
// createTime: 2019/4/22

import * as express from 'express';
import { IRoute, Router } from "express-serve-static-core";

let router:Router = express.Router();

router.get('/', async (req, res, next) => {
    res.render('index', {
        title: 'Express&Typescript'
    })
});

module.exports = router;
