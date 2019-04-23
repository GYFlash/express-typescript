"use strict";
// FileName: index.ts
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
router.get('/', (req, res, next) => {
    res.render('index', {
        title: 'Express&Typescript'
    });
});
module.exports = router;
//# sourceMappingURL=index.js.map