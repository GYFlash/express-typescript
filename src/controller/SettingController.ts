// FileName: SettingController.ts
// ProjectName: express-admin
// 作者：区区电脑
// createTime: 2019/4/28

import {BaseController} from "./BaseController";
import {JsonResponse, JsonResponseError, JsonResponseSuccess} from "../common/common";
import {Connection} from "typeorm";
import {Navigation} from "../models/Navigation";

export class SettingController extends BaseController{
    constructor () {
        super();
    }

    /**
     * 设置侧边栏导航
     * @param params
     */
    public async settingNavigation(params?:any):Promise<JsonResponse> {
        let navs = JSON.parse(params.data);
        let connection:Connection = await this._connectionOpen();
        if (!connection) {
            this.jsonResponse = new JsonResponseError();
            this.jsonResponse.message = '数据库连接失败';
            return this.jsonResponse;
        }
        let array:Array<Navigation> = [];
        for (let i = 0; i < navs.length; i++) {
            let nav:Navigation = new Navigation();
            nav.id = navs[i].id;
            nav.title = navs[i].title;
            nav.suvNavItems = JSON.stringify(navs[i].subNavItems);
            array.push(nav);
        }
        let result = await connection.manager.save(array);
        if (!result) {
            this.jsonResponse = new JsonResponseError();
            this.jsonResponse.message = '保存失败';
            return this.jsonResponse;
        } else {
            this.jsonResponse = new JsonResponseSuccess();
            this.jsonResponse.message = '保存成功';
            return this.jsonResponse;
        }
    }

    /**
     * 获取侧边栏导航
     * @param params
     */
    public async getNavigation(params?:any):Promise<JsonResponse> {
        let connection:Connection = await this._connectionOpen();
        if (!connection) {
            this.jsonResponse = new JsonResponseError();
            this.jsonResponse.message = '数据库连接失败';
            return this.jsonResponse;
        }
        let navs:Array<Navigation> = await Navigation.find();
        let array:Array<Navigation> = [];
        for (let i = 0; i < navs.length; i++) {
            let nav:Navigation = navs[i];
            if (navs[i].suvNavItems) {
                // @ts-ignore
                nav.suvNavItems = JSON.parse(navs[i].suvNavItems);
            }
            array.push(nav);
        }
        this.jsonResponse = new JsonResponseSuccess();
        this.jsonResponse.data = array;
        return this.jsonResponse;
    }
}
