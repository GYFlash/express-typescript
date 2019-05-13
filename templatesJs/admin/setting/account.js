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
        avatarDidClick: function () {
            var _this = this;
            $wt._fileUpload(function (res) {
                console.log(res);
                _this.myInfo.avatar = res.data;
            });
        },
        editSure: function () {
            var params = {
                avatar: this.myInfo.avatar,
                nickname: this.myInfo.nickname
            };
            $wt._request({
                url: $wt.url.adminSetMyInfo,
                useToken: true,
                data: params,
                success: function (res) {
                    if (res.code == '000') {
                        $wt._message({
                            msg: res.message,
                            type: 'success'
                        })
                    }
                }
            })
        }
    }
});

function showApp(vue) {
    document.getElementById('app').style.display = 'block';
    vue.appShow = true;
}
