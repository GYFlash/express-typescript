// FileName: nav-list
// ProjectName: express-admin
// 作者: 区区电脑
// CreateTime: 2019/4/28
(function () {
    // 使用layui
    layui.use('element', function(){
        var element = layui.element;
    });
    //Demo
    layui.use('form', function(){
        form = layui.form;
        //监听提交
        form.on('submit(setNav)', function(data){
            console.log(app.navItems);
            $.ajax({
               url: '/api/setting/nav-list',
                beforeSend: function(request) {
                    request.setRequestHeader('restype','json');
                    request.setRequestHeader('token', window.localStorage.getItem('token'));
                },
                data: {
                   data: JSON.stringify(app.navItems)
                },
                type: 'post',
                success: function (res) {
                    if (res.status === 'success') {
                        layer.msg(res.message);
                    } else {
                        layer.msg(res.message);
                    }
                }
            });
            return false;
        });
        form.on('select(navItem)', function(data){
            console.log(data.value);
            app.activeIndex = data.value;
            form.render();
            app.$forceUpdate()

        });
    });

})();

const app =  new Vue({
    el: '#app',
    data: {
        appShow: false,
        vueTitle: 'welcome use vue template!',
        activeIndex: 0,
        navItems: [{subNavItems: []}]
    },
    mounted: function () {
        showApp(this);
        this.loadNav();
    },
    methods: {
        loadNav: function () {
            let _this = this;
            $.ajax({
                url: '/api/get-nav',
                beforeSend: function(request) {
                    request.setRequestHeader('restype','json');
                    request.setRequestHeader('token', window.localStorage.getItem('token'));
                },
                data: null,
                type: 'get',
                success: function (res) {
                    if (res.status === 'success') {
                        _this.navItems = res.data;

                    } else {
                        layer.msg(res.message);
                    }
                }
            });
        },
        addPre: function () {
            this.navItems.push({
                id: null,
                title: '新分组',
                subNavItems: []
            });
            layui.form.render();
            app.$forceUpdate()

        },
        addSub: function () {
            this.navItems[this.activeIndex].subNavItems.push({
                title: '新路由',
                routerPath: '/'
            });
            layui.form.render();
            app.$forceUpdate()
        }
    }
});

function showApp(vue) {
    document.getElementById('app').style.display = 'block';
    vue.appShow = true;
}


