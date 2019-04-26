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
    public async userRegister(params:any):Promise<JsonResponse> {
        if (params.account && params.password) {
            // 链接数据库
            let con:Connection = await this._connectionOpen();
            if (!con) {
                this.jsonResponse = new JsonResponseError();
                this.jsonResponse.message = '数据库连接失败';
                return this.jsonResponse;
            }
            // 查询用户是否存在
            let user:User|undefined = await User.findOne({account:params.account});
            if (user) {
                this.jsonResponse = new JsonResponseError();
                this.jsonResponse.message = '用户已存在';
                return this.jsonResponse;
            } else {
                // 创建新用户
                let newUser:User = new User();
                let _this = this;
                newUser.account = params.account;
                newUser.password = Md5(params.password);
                // 新用户保存到数据库
                let resUser:User = await con.manager.save(newUser);
                if (resUser) {
                    this.jsonResponse = new JsonResponseSuccess();
                    this.jsonResponse.message = '注册成功';
                    this.jsonResponse.data = resUser;
                    return this.jsonResponse;
                } else {
                    this.jsonResponse = new JsonResponseError();
                    this.jsonResponse.message = '注册失败';
                    return this.jsonResponse;
                }
            }
        } else {
            this.jsonResponse = new JsonResponseError();
            this.jsonResponse.message = '请补全信息';
            return this.jsonResponse;
        }
    }

    /**
     * 用户登录
     * @param params
     */
    public async userLogin(params:any):Promise<JsonResponse> {
        if (params.account && params.password) {
            // 链接数据库
            let con:Connection = await this._connectionOpen();
            if (!con) {
                this.jsonResponse = new JsonResponseError();
                this.jsonResponse.message = '数据库连接失败';
                return this.jsonResponse;

            }
            // 查询用户
            let user:User|undefined = await User.findOne({account: params.account});
            if (!user) {
                this.jsonResponse = new JsonResponseError();
                this.jsonResponse.message = '用户不存在';
                return this.jsonResponse;
            } else {
                // 校验登录密码
                if (user.password !== Md5(params.password)) {
                    this.jsonResponse = new JsonResponseError();
                    this.jsonResponse.message = '密码错误';
                    return this.jsonResponse;
                } else {

                    // 登录成功
                    let token:string = Token.create({
                        account: user.account,
                        id: user.id
                    });
                    user.token = token;
                    this.jsonResponse = new JsonResponseSuccess();
                    this.jsonResponse.data = user;
                    this.jsonResponse.message = '登录成功';
                    return this.jsonResponse;
                }
            }
        } else {
            this.jsonResponse = new JsonResponseError();
            this.jsonResponse.message = '请补全信息';
            return this.jsonResponse;
        }
    }

    /**
     * 查询用户列表
     * @param params
     */
    public async userGetAll(params?:any):Promise<JsonResponse> {
        // 链接数据库
        let con:Connection = await this._connectionOpen();
        if (!con) {
            this.jsonResponse = new JsonResponseError();
            this.jsonResponse.message = '数据库连接失败';
            return this.jsonResponse;
        }
        // 查询用户
        let users = await User.find();
        this.jsonResponse = new JsonResponseSuccess();
        this.jsonResponse.message = '查询成功';
        this.jsonResponse.data = users;
        return this.jsonResponse;
    }
}
