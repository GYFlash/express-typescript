// FileName: account
// ProjectName: express-typescript
// 作者: 区区电脑
// CreateTime: 2019/5/13
const app =  new Vue({
    el: '#app',
    data: {
        appShow: false,
        vueTitle: '<%- title%>',
        currentItem: {},
        myInfo: {
            nickname: '',
            avatar: ''
        }
    },
    mounted: function () {
        showApp(this);
        this.loadMyInfo();
    },
    methods: {
        loadMyInfo: function () {
            var _this = this;
            $wt._request({
                url: $wt.url.adminGetMyInfo,
                useToken: true,
                success: function (res) {
                    _this.myInfo = res.data;
                }
            })
        },
        editSure: function () {
            $wt._request({
                url: $wt.url.adminGetMyInfo,
                useToken: true,
                success: function (res) {
                }
            })
        }
    }
});

function showApp(vue) {
    document.getElementById('app').style.display = 'block';
    vue.appShow = true;
}
