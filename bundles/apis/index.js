"use strict";
// ProjectName: express_01
// FileName: index.ts
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
const index_1 = require("../models/index");
const User_1 = require("../models/User");
const common_1 = require("../common/common");
let router = express.Router();
//// 用户注册
router.post('/add-user', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let params = req.body;
    if (params.userName && params.password) {
        let con = yield index_1.connection();
        let user = yield User_1.User.findOne({ name: params.userName });
        if (user) {
            res.json({
                status: 'error',
                code: '001',
                result: null,
                message: '用户已存在'
            });
            con.close();
        }
        else {
            let newUser = new User_1.User();
            newUser.name = params.userName;
            newUser.password = params.password;
            con.manager.save(newUser).then((u) => __awaiter(this, void 0, void 0, function* () {
                con.close();
                res.json({
                    status: 'success',
                    code: '000',
                    result: u,
                    message: '注册成功'
                });
            })).catch(() => {
                con.close();
                res.json({
                    status: 'error',
                    code: '001',
                    result: null,
                    message: '注册失败'
                });
            });
        }
    }
    else {
        res.json({
            status: 'error',
            code: '001',
            result: null,
            message: '请补全信息'
        });
    }
}));
//// 用户登录
router.post('/login', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let params = req.body;
    if (params.userName && params.password) {
        let con = yield index_1.connection();
        // let user:User = new User();
        let user = yield User_1.User.findOne({ name: params.userName });
        if (!user) {
            res.json({
                status: 'error',
                code: '001',
                result: null,
                message: '用户不存在'
            });
            con.close();
        }
        else {
            if (user.password !== params.password) {
                res.json({
                    status: 'error',
                    code: '001',
                    result: null,
                    message: '密码错误'
                });
                con.close();
            }
            else {
                let token = common_1.Token.create({
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
                });
                con.close();
            }
        }
    }
    else {
        res.json({
            status: 'error',
            code: '001',
            result: null,
            message: '请补全信息'
        });
    }
}));
//// 用户列表查询
router.post('/getUsers', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let con = yield index_1.connection();
    let users = yield User_1.User.find();
    con.close();
    res.json({
        status: 'success',
        code: '000',
        result: users,
        message: '查询成功'
    });
}));
module.exports = router;
//# sourceMappingURL=index.js.map