// FileName: manager
// ProjectName: express-admin
// 作者: 区区电脑
// CreateTime: 2019/5/6
var pageNumber = 1;
const app =  new Vue({
    el: '#app',
    data: {
        appShow: false,
        vueTitle: 'welcome use vue template!',
        list: null,
        currentItem: null,
        userId: null
    },
    mounted: function () {
        this.userId = window.localStorage.getItem('user.id');
        showApp(this);
        this.loadData();
    },
    methods: {
        loadData: function () {
            var _this = this;
            $('#datagridContent').datagrid({
                dataSource: {
                    cols:[
                        {name: 'id', label: 'id'},
                        {name: 'avatar', label: '头像', valueOperator: {
                            getter: function (value, cell, dataGrid) {
                                var img = document.createElement('img');
                                img.src = value;
                                img.style.width = '30px';
                                img.style.height = '30px';
                                img.style.borderRadius = '30px';
                                img.style.position = 'absolute';
                                img.style.top = '3px';
                                img.style.left = '5px';
                                return img;
                            }
                            }},
                        {name: 'account', label: '账号'},
                        {name: 'nickname', label: '昵称'},
                        {name: 'admin', label: '管理员权限', valueOperator: {
                            getter: function (value, cell, dataGrid) {
                                return value == 1 ? '是' : '否'
                            }
                            }},
                        {name: '', label: '操作', valueOperator: {
                                getter: function (value, cell, dataGrid) {
                                    var index = parseInt(cell.rowIndex) - 1;
                                    return '<div class="btn-group" style="position: absolute;left: 5px; top: 3px;"><button type="button" class="btn btn-primary" onclick="edit('+ index +')">编辑</button></div>'
                                }
                            }},
                    ],
                    remote: function (params) {
                        return {
                            url: $wt.url.adminGetUsers.path,
                            type: $wt.url.adminGetUsers.type,
                            dataType: 'json'
                        }
                    },
                    remoteConverter: function (resPonseData) {
                        if (resPonseData.result == 'success') {
                            _this.list = resPonseData.data;
                            pageNumber = resPonseData.pager.page
                        }
                        return resPonseData;
                    }
                },
                states: {
                    pager: {page: 1, recPerPage: 10}
                },
                configs: {
                    C2: {
                        html: true
                    },
                    C6: {
                        html: true
                    }
                }
            })
        },
        showEdit: function (index) {
            this.currentItem = this.list[index];
            $('#edit').modal({position: 100});
        },
        cancelEdit: function () {
            $('#edit').modal('hide');
            this.currentItem = null;
        },
        sureEdit: function () {
            var _this = this;
            var params = {
                id: this.currentItem.id,
                admin: this.currentItem.admin
            };
            $wt._request({
                url: $wt.url.adminSetUserManager,
                data: params,
                useToken: true,
                success: function (res) {
                    if (res.code == '000') {
                        $wt._message({
                            msg: res.message,
                            type: 'success'
                        });
                        // 获取数据表格实例
                        var dataGrid = $('#datagridContent').data('zui.datagrid');
                        // 切换并渲染该页面
                        dataGrid.goToPage(pageNumber);
                        $('#edit').modal('hide');
                    }
                }
            });

        }
    }
});

function showApp(vue) {
    document.getElementById('app').style.display = 'block';
    vue.appShow = true;
}

function edit(index) {
    app.showEdit(index);
}
