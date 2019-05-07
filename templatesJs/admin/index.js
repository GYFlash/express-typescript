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
        showLeftNavBar: true,
        navigationItems: null,
        tempNavs: [],
        currentNav: {
            routerPath: '/admin/home'
        }
    },
    mounted: function () {
        showApp(this);
        this.loadNavigation();
    },
    methods: {
        homeClick: function () {
            this.currentNav.routerPath = '/admin/home';
        },
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
        },
        /**
         * 加载导航栏内容
         */
        loadNavigation: function () {
            var _this = this;
            $wt._request({
                url: $wt.url.adminGetMenu,
                useToken: true,
                success: function (res) {
                    _this.navigationItems = res.data;
                    setClickEvents();
                }
            })
        },
        subNavDidClicked: function (nav) {
            if (this.tempNavs.indexOf(nav) > -1) {
                this.changeContent(this.tempNavs.indexOf(nav));
            } else {
                this.tempNavs.push(nav);
                this.changeContent(null);
            }

            if (window.document.documentElement.clientWidth < windowCriticalValue) {
                this.showLeftNavBar = false;
                if (this.tempNavs.length > 4) {
                    this.closeTemp(0)
                }
            } else {
                if (this.tempNavs.length > 21) {
                    this.closeTemp(0)
                }
            }

        },
        changeContent: function (index) {
            for (var i = 0; i < this.tempNavs.length; i++) {
                this.tempNavs[i]['active'] = false;
            }
            if (this.tempNavs.length === 0) { return }
            if (index != null) {
                console.log(index);
                this.tempNavs[index]['active'] = true;
                this.currentNav = this.tempNavs[index];
            } else {
                this.tempNavs[this.tempNavs.length - 1]['active'] = true;
                this.currentNav = this.tempNavs[this.tempNavs.length - 1];
            }
        },
        closeTemp: function (index) {
            if (index > -1) {
                this.tempNavs.splice(index, 1);
                this.changeContent(null);
            }
        }
    },
    computed: {},
    watch: {
        tempNavs: function () {
            if (this.tempNavs.length === 0) {
                this.currentNav = {
                    routerPath: '/admin/home'
                }
            }
        }
    }
});

function showApp(vue) {
    document.getElementById('app').style.display = 'block';
    vue.appShow = true;
}
if (window.screen.width > windowCriticalValue) {
    app.showLeftNavBar = true;
} else if (window.screen.width == windowCriticalValue) {
} else {
    app.showLeftNavBar = false;
}
window.onresize = function () {
    if (window.screen.width > windowCriticalValue) {
        app.showLeftNavBar = true;
    } else if (window.screen.width == windowCriticalValue) {
    } else {
        app.showLeftNavBar = false;
    }
};
