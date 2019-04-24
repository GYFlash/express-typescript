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

const app =  new Vue({
    el: '#app',
    data: {
        appShow: false,
        vueTitle: 'welcome use vue template!',
        users: null
    },
    mounted: function () {
        showApp(this);
        let _this = this;
        $.ajax({
            url: '/api/getUsers',
            beforeSend: function(request) {
                request.setRequestHeader("restype","json");
                request.setRequestHeader("token", window.localStorage.getItem('token'));
            },
            type: 'post',
            success: function (res) {
                if (res.status === 'success') {
                    console.log(res);
                    _this.users = res.result;
                } else {
                    alert(res.message);
                    if (res.message === '登录超时') {
                        window.location = '/admin/login'
                    }
                }
            }
        })
    }
});

function showApp(vue) {
    document.getElementById('app').style.display = 'block';
    vue.appShow = true;
}
