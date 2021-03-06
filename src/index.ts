// FileName: Connection.ts
// ProjectName: express-typescript
// 作者：区区电脑
// createTime: 2019/4/23

import * as express from 'express';
import { IRoute, Router } from "express-serve-static-core";

const router:Router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Express&Typescript'
    })
});

router.get('/ff-ui', (req, res, next) => {
    res.render('ff-ui', {
        title: 'Express&Typescript'
    })
});

module.exports = router;
