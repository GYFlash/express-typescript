// ProjectName: express-typescript
// FileName: index
// 作者: 区区电脑
// CreateTime: 2019/4/23

(function () {
    // 使用layui
    layui.use('element', function(){
        var element = layui.element;
    });

})();

//// 页面自适应时的窗口宽度临界值
const windowCriticalValue = 765;

const app =  new Vue({
    el: '#app',
    data: {
        appShow: false,
        vueTitle: 'welcome use vue template!',
        users: null,
        showLeftNavBar: true
    },
    mounted: function () {
        showApp(this);
        // let _this = this;
        // $.ajax({
        //     url: '/api/getUsers',
        //     beforeSend: function(request) {
        //         request.setRequestHeader("restype","json");
        //         request.setRequestHeader("token", window.localStorage.getItem('token') + '');
        //     },
        //     type: 'post',
        //     success: function (res) {
        //         if (res.status === 'success') {
        //             console.log(res);
        //             _this.users = res.data;
        //         } else {
        //             alert(res.message);
        //             if (res.message === '登录超时' || res.message === '未登录') {
        //                 window.location = '/admin/login'
        //             }
        //         }
        //     }
        // })
    },
    methods: {
        /**
         * 退出登录
         */
        logout: function () {
            window.localStorage.clear('token');
            window.location = '/admin/login'
        },
        /**
         * 点击 logo
         */
        layuiLogoDidClicked: function () {
            this.showLeftNavBar = !this.showLeftNavBar;
            console.log(this.showLeftNavBar);
        }
    },
    computed: {
        // 自适应主体容器
        layuiBodyStyle: function () {
            if (this.showLeftNavBar && window.screen.width > windowCriticalValue) {
                return 'left: 0 !important;margin-left: 200px !important;'
            } else {
                return 'left: 0 !important;'
            }
        },
        // 自适应底部条
        layuiFooterStyle: function () {
            if (this.showLeftNavBar && window.screen.width > windowCriticalValue) {
                return 'left: 0 !important;margin-left: 200px !important;'
            } else {
                return 'left: 0 !important;'
            }
        }
    }
});

function showApp(vue) {
    document.getElementById('app').style.display = 'block';
    vue.appShow = true;
}

window.onresize = function () {
    if (window.screen.width > windowCriticalValue) {
        app.showLeftNavBar = true;
    } else if (window.screen.width == windowCriticalValue) {
    } else {
        app.showLeftNavBar = false;
    }
}
