// FileName: common.ts
// ProjectName: express-admin
// 作者：区区电脑
// createTime: 2019/4/24

import Jwt from 'jsonwebtoken';
import crypto from 'crypto';

//// 枚举 key
enum ExpressKey {
    tokenKey = 'express_admin_token_key'
}

//// 枚举 jsonResponse 响应类型
enum JsonResponseStatus {
    success = 'success',
    error = 'error'
}

//// 枚举 jsonResponse 响应状态码
enum JsonResponseStatusCode {
    code_000 = '000', // 统一成功
    code_100 = '100' // 统一失败
}

//// token 校验结果
class TokenResult {
    data:any;
    message:string;
    constructor (data:any, message:string) {
        this.data = data;
        this.message = message;
    }
}

//// 拦截器
class Intercept {

    /**
     * 应该过滤
     * @param url
     */
    public static shouldNot(url:string):boolean {
        return url == '/api/register'
            || url == '/api/login'
            || (url.indexOf('/admin') != -1)
    }
}

//// token
class Token {

    /**
     * 生成 token 使用的 key
     */
    private static key:ExpressKey = ExpressKey.tokenKey;

    /**
     * 生成 token
     * @param user
     */
    public static create(user:any):string {
        return Jwt.sign(user, Token.key, {
            expiresIn: 60 * 60 * 2 + 's'
        });
    }

    /**
     * 校验 token
     * @param token
     */
    public static async check(token:string) {
        return await new Promise<TokenResult>((resolve) => {
            Jwt.verify(token,  Token.key,  (err, decode) => {
                if (err) {
                    console.log(err.message);
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
    }
}

//// json 响应
class JsonResponse {

    // 响应状态
    public status:JsonResponseStatus;
    // 响应数据
    public data:any;
    // 响应状态码
    public code:JsonResponseStatusCode;
    // 响应提示信息
    public message:string;

    constructor () {
        this.status = JsonResponseStatus.success;
        this.code = JsonResponseStatusCode.code_000;
        this.message = '';
    }
}

//// 操作成功的 json 响应对象
class JsonResponseSuccess extends JsonResponse{
    constructor () {
        super();
        this.status = JsonResponseStatus.success;
        this.code = JsonResponseStatusCode.code_000;
        this.message = '成功';
    }
}

//// 操作失败的 json 响应对象
class JsonResponseError extends JsonResponse {
    constructor () {
        super();
        this.status = JsonResponseStatus.error;
        this.code = JsonResponseStatusCode.code_100;
        this.message = '操作失败';
    }
}

//// md5加密
let Md5 = function (message:string):string {
    const md5 = crypto.createHash('md5');
    return md5.update(message).digest('hex');
};

export {
    ExpressKey,
    TokenResult,
    Intercept,
    Token,
    JsonResponse,
    JsonResponseSuccess,
    JsonResponseError,
    JsonResponseStatus,
    JsonResponseStatusCode,
    Md5
}
