"use strict";
// ProjectName: express_01
// FileName: Connection.ts
// 作者：区区电脑
// createTime: 2019/4/22
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
const UserController_1 = require("../controller/UserController");
const SettingController_1 = require("../controller/SettingController");
let router = express.Router();
//// 用户注册
router.post('/register', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let params = req.body;
    let userController = new UserController_1.UserController();
    let jsonResponse = yield userController.userRegister(params);
    res.json(jsonResponse);
}));
//// 用户登录
router.post('/login', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let params = req.body;
    let userController = new UserController_1.UserController();
    let jsonResponse = yield userController.userLogin(params);
    res.json(jsonResponse);
}));
//// 用户列表查询
router.post('/getUsers', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let userController = new UserController_1.UserController();
    let jsonResponse = yield userController.userGetAll();
    res.json(jsonResponse);
}));
//// 设置侧边栏导航
router.post('/setting/nav-list', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let params = req.body;
    let settingController = new SettingController_1.SettingController();
    let jsonResponse = yield settingController.settingNavigation(params);
    res.json(jsonResponse);
}));
//// 获取侧边栏导航
router.get('/get-nav', (req, res) => __awaiter(this, void 0, void 0, function* () {
    let settingController = new SettingController_1.SettingController();
    let jsonResponse = yield settingController.getNavigation();
    res.json(jsonResponse);
}));
module.exports = router;
//# sourceMappingURL=Index.js.map