"use strict";
// FileName: adminViews.ts
// ProjectName: express-typescript
// 作者：区区电脑
// createTime: 2019/4/23
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const router = express.Router();
// 首页
router.get('/', (req, res, next) => {
    res.render('admin/index', {
        title: 'Welcome to express admin'
    });
});
// 登录
router.get('/login', (req, res, next) => {
    res.render('admin/login', {
        title: 'login admin'
    });
});
module.exports = router;
//# sourceMappingURL=adminViews.js.map