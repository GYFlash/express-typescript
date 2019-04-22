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
const index_1 = require("../dbModes/index");
const User_1 = require("../dbModes/User");
let router = express.Router();
router.post('/add-user', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let params = req.body;
    if (params.name && params.age && params.sign) {
        let con = yield index_1.connection();
        let user = new User_1.User();
        user.name = params.name;
        user.age = params.age;
        user.sign = params.sign;
        con.manager.save(user).then((u) => __awaiter(this, void 0, void 0, function* () {
            let users = yield User_1.User.find();
            con.close();
            res.json({
                status: 'success',
                code: '000',
                result: users,
                message: '成功'
            });
        }));
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
module.exports = router;
//# sourceMappingURL=index.js.map