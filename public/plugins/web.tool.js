// FileName: zui.public
// ProjectName: express-admin
// 作者: 区区电脑
// CreateTime: 2019/4/28
(function (w) {
    var webTool = {
        host: '',
        url: {
            adminLogin: { type: 'post', path: '/api/login' },
            adminRegister: { type: 'post', path: '/api/register' },
            adminSetMenu: { type: 'post', path: '/api/set-menu' },
            adminGetMenu: { type: 'get', path: '/api/get-menu' }
        },
        /**
         * zui 消息悬浮框
         * @param options
         */
        _message: function (options) {
            console.log(options);
            var type = options.type || 'warning';
            var msg = options.msg || 'hello 区区电脑';
            new $.zui.Messager(msg, {
                type: type,
                close: false
            }).show();
        },
        /**
         * 网络请求
         * @param options
         * @private
         */
        _request: function (options) {
            var _this = this;
            var url = options.url.path || '';
            var data = options.data || {};
            var type = options.url.type || 'get';
            var useToken = options.useToken;
            var success = options.success || function () { console.log('success 方法未定义，请求路径：' + options.url.path) };
            $.ajax({
                url: this.host + url,
                beforeSend: function(request) {
                    request.setRequestHeader("restype","json");
                    if (useToken) {
                        request.setRequestHeader('token', window.localStorage.getItem('express_token'));
                    }
                },
                data: data,
                type: type,
                success: function (res) {
                    if (res.code == '000') {
                        success(res)
                    } else {
                        _this._message({
                           msg: res.message
                        });
                        success(res)
                    }
                }
            })
        }
    };
    w.$wt = webTool;
})(window);
