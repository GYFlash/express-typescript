// ProjectName: express-typescript
// FileName: index
// 作者: 区区电脑
// CreateTime: 2019/4/23


//// 页面自适应时的窗口宽度临界值
const windowCriticalValue = 765;

const app =  new Vue({
    el: '#app',
    data: {
        appShow: false,
        vueTitle: 'welcome use vue template!',
        showLeftNavBar: true
    },
    mounted: function () {
        showApp(this);
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
        logoDidClicked: function () {
            this.showLeftNavBar = !this.showLeftNavBar;
            console.log(this.showLeftNavBar);
        }
    },
    computed: {}
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
