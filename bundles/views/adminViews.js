"use strict";
// FileName: AdminViews.ts
// ProjectName: express-typescript
// 作者：区区电脑
// createTime: 2019/4/23
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
//// 首页
router.get('/', (req, res) => {
    res.render('admin/index', {
        title: 'Welcome to express admin'
    });
});
//// 注册
router.get('/register', (req, res) => __awaiter(this, void 0, void 0, function* () {
    res.render('admin/register', {
        title: '注册'
    });
}));
//// 登录
router.get('/login', (req, res) => {
    res.render('admin/login', { title: '登录' });
});
//// 设置侧边导航栏列表
router.get('/setting/nav-list', (req, res) => {
    res.render('admin/setting/nav-list', { title: '设置侧边导航栏' });
});
module.exports = router;
//# sourceMappingURL=AdminViews.js.map