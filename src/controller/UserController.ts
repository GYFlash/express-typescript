// FileName: UserController.ts
// ProjectName: express-typescript
// 作者：区区电脑
// createTime: 2019/4/23

import { BaseController } from "./BaseController";
import {
    JsonResponse,
    JsonResponseError,
    JsonResponseSuccess,
    Md5, Token
} from "../common/common";
import { User } from "../models/User";
import { Connection } from "typeorm";

export class UserController extends BaseController{

    constructor () {
        super();
    }

    /**
     * 用户注册
     * @param params
     */
    public async userRegister(params:any) {
        let _this = this;
        return await new Promise<JsonResponse>(async (resolve) => {
            if (params.account && params.password) {
                // 链接数据库
                let con:Connection = await _this._connectionOpen();
                if (!con) {
                    _this.jsonResponse = new JsonResponseError();
                    _this.jsonResponse.message = '数据库连接失败';
                    resolve(_this.jsonResponse);
                    return
                }
                // 查询用户是否存在
                let user:User|undefined = await User.findOne({account:params.account});
                if (user) {
                    _this.jsonResponse = new JsonResponseError();
                    _this.jsonResponse.message = '用户已存在';
                    con.close();
                    resolve(_this.jsonResponse)
                } else {
                    // 创建新用户
                    let newUser:User = new User();
                    newUser.account = params.account;
                    newUser.password = Md5(params.password);
                    // 新用户保存到数据库
                    con.manager.save(newUser).then(async (u:User) => {
                        _this.jsonResponse = new JsonResponseSuccess();
                        _this.jsonResponse.message = '注册成功';
                        _this.jsonResponse.data = u;
                        con.close();
                        resolve(_this.jsonResponse)
                    }).catch(() => {
                        _this.jsonResponse = new JsonResponseError();
                        _this.jsonResponse.message = '注册失败';
                        con.close();
                        resolve(_this.jsonResponse)
                    })
                }
            } else {
                _this.jsonResponse = new JsonResponseError();
                _this.jsonResponse.message = '请补全信息';
                resolve(_this.jsonResponse)
            }
        })
    }

    /**
     * 用户登录
     * @param params
     */
    public async userLogin(params:any) {
        let _this = this;
        return await new Promise<JsonResponse>(async (resolve) => {
            if (params.account && params.password) {
                // 链接数据库
                let con:Connection = await _this._connectionOpen();
                if (!con) {
                    _this.jsonResponse = new JsonResponseError();
                    _this.jsonResponse.message = '数据库连接失败';
                    resolve(_this.jsonResponse);
                    return
                }
                // 查询用户
                let user:User|undefined = await User.findOne({account: params.account});
                if (!user) {
                    _this.jsonResponse = new JsonResponseError();
                    _this.jsonResponse.message = '用户不存在';
                    con.close();
                    resolve(_this.jsonResponse)
                } else {
                    // 校验登录密码
                    if (user.password !== Md5(params.password)) {
                        _this.jsonResponse = new JsonResponseError();
                        _this.jsonResponse.message = '密码错误';
                        con.close();
                        resolve(_this.jsonResponse)
                    } else {

                        // 登录成功
                        let token = Token.create({
                            account: user.account,
                            id: user.id
                        });
                        user.token = token;
                        _this.jsonResponse = new JsonResponseSuccess();
                        _this.jsonResponse.data = user;
                        _this.jsonResponse.message = '登录成功';
                        con.close();
                        resolve(_this.jsonResponse);
                    }
                }
            } else {
                _this.jsonResponse = new JsonResponseError();
                _this.jsonResponse.message = '请补全信息';
                resolve(_this.jsonResponse);
            }
        });
    }

    /**
     * 查询用户列表
     * @param params
     */
    public async userGetAll(params?:any) {
        let _this = this;
        return await new Promise<JsonResponse>(async (resolve) => {
            // 链接数据库
            let con:Connection = await _this._connectionOpen();
            if (!con) {
                _this.jsonResponse = new JsonResponseError();
                _this.jsonResponse.message = '数据库连接失败';
                resolve(_this.jsonResponse);
                return
            }
            // 查询用户
            let users = await User.find();
            _this.jsonResponse = new JsonResponseSuccess();
            _this.jsonResponse.message = '查询成功';
            _this.jsonResponse.data = users;
            con.close();
            resolve(_this.jsonResponse)
        });
    }
}
