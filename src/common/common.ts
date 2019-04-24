// FileName: common.ts
// ProjectName: express-admin
// 作者：区区电脑
// createTime: 2019/4/24

import Jwt from 'jsonwebtoken';
import {error} from "util";

//// 枚举 key
enum ExpressKey {
    tokenKey = 'express_admin_token_key'
}

//// token 校验结果
class TokenResult {
    data:any;
    message:string;
    constructor (data:any, message:string) {
        this.data = data;
        this.message = message;
    }
};

//// 拦截器
class Intercept {

}

//// token
class Token {

    /**
     * 生成 token 使用的 key
     */
    private static key:ExpressKey = ExpressKey.tokenKey;

    /**
     * 生成 token
     * @param userStr
     */
    public static create(user:Object):string {
        let token:string = Jwt.sign(user, Token.key, {
            expiresIn: '20s'
        });
        return token;
    }

    /**
     * 校验 token
     * @param token
     */
    public static async check(token:string) {
        let result = new Promise((resolve, reject) => {
            Jwt.verify(token,  Token.key,  (err, decode) => {
                if (err) {
                    console.log(err.message)
                    let message:string = '无效的 token';
                    if (err.message == 'jwt malformed') {
                        message = '无效的 token';
                    } else if (err.message == 'jwt expired') {
                        message = '登录超时';
                    }
                    resolve(new TokenResult(false,  message))
                } else {
                    resolve(new TokenResult(decode, ''))
                }
            })
        });
        return result;
    }
}

export {ExpressKey, TokenResult, Intercept, Token}
