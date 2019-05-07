// FileName: manager
// ProjectName: express-admin
// 作者: 区区电脑
// CreateTime: 2019/5/6
const app =  new Vue({
    el: '#app',
    data: {
        appShow: false,
        vueTitle: 'welcome use vue template!'
    },
    mounted: function () {
        showApp(this);
        this.loadData();
    },
    methods: {
        loadData: function () {
            // $wt._request({
            //     url: $wt.url.adminGetUsers,
            //     useToken: true,
            //     data: {
            //         type: 1
            //     },
            //     success: function (res) {
            //         console.log(res);
            //     }
            // })
            $('#datagridContent').datagrid({
                dataSource: {
                    cols:[
                        {name: 'id', label: 'id'},
                        {name: 'avatar', label: '头像'},
                        {name: 'account', label: '账号'},
                        {name: 'nickname', label: '昵称'},
                        {name: '', label: '操作'},
                    ],
                    remote: function (params) {
                        return {
                            url: $wt.url.adminGetUsers.path,
                            type: $wt.url.adminGetUsers.type,
                            dataType: 'json',
                            params: {
                                type: 1
                            }
                        }
                    }
                },
                states: {
                    pager: {page: 1, recPerPage: 10}
                }
            })
        }
    }
});

function showApp(vue) {
    document.getElementById('app').style.display = 'block';
    vue.appShow = true;
}
