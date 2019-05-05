// FileName: menu
// ProjectName: express-admin
// 作者: 区区电脑
// CreateTime: 2019/4/28

const app =  new Vue({
    el: '#app',
    data: {
        appShow: false,
        vueTitle: 'welcome use vue template!',
        navigationItems: [{subNavItems: [], iconClass: ''}],
        activeIndex: 0,
        currentNavGroup: {},
        iconArray: [],
        selectIconIndex: null
    },
    mounted: function () {
        showApp(this);
        this.loadNavigation();
        this.iconArray = JSON.parse($wt.zuiIcons)
    },
    methods: {
        /**
         * 加载导航栏内容
         */
        loadNavigation: function () {
            var _this = this;
            $wt._request({
                url: $wt.url.adminGetMenu,
                useToken: true,
                success: function (res) {
                    console.log(res.data);
                    _this.navigationItems = res.data;
                }
            })
        },
        add: function () {
            this.navigationItems[this.activeIndex].subNavItems.push({
                title: '',
                routerPath: ''
            })
        },
        addGroup: function () {
            this.navigationItems.push({
                id: null,
                title: '',
                iconClass: 'icon icon-user',
                subNavItems: []
            })
        },
        removeSub: function (index) {
            if (index > -1) {
                this.navigationItems[this.activeIndex].subNavItems.splice(index, 1);
            }
        },
        removeGroup: function (index) {
            var _this = this;
            $wt._request({
                url: $wt.url.adminDelMenu,
                data: {
                    id: this.navigationItems[index].id
                },
                useToken: true,
                success: function (res) {
                    if (res.code == '000') {
                        $wt._message({
                            msg: res.message,
                            type: 'success'
                        })
                        _this.loadNavigation();
                    }
                }
            })
        },
        editGroupModal: function () {
            $('#editGroupModal').modal({position: 100});
        },
        showIconsView: function (index) {
            this.selectIconIndex = index;
            $('#icons').modal({position: 100});
        },
        iconDidSelected: function (iconName) {
            this.navigationItems[this.selectIconIndex].iconClass = 'icon ' + iconName;
            $('#icons').modal('hide');
        },
        save: function () {
            $wt._request({
                url: $wt.url.adminSetMenu,
                data: { data: JSON.stringify(this.navigationItems) },
                useToken: true,
                success: function (res) {
                    $wt._message({
                        msg: res.message
                    })
                }
            })
        }
    }
});

function showApp(vue) {
    document.getElementById('app').style.display = 'block';
    vue.appShow = true;
}

