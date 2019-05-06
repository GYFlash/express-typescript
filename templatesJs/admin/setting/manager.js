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
            $('#datagridContent').datagrid({
                dataSource: {
                    cols:[
                        {name: 'time', label: '时间', width: 132},
                        {name: 'hero', label: '英雄', width: 134},
                        {name: 'action', label: '动作', width: 109},
                        {name: 'target', label: '目标', width: 109},
                        {name: 'desc', label: '描述', width: 287}
                    ],
                    array:[
                        {time: '00:11:12', hero:'幻影刺客', action: '击杀', target: '斧王', desc: '幻影刺客击杀了斧王。'},
                        {time: '00:13:22', hero:'幻影刺客', action: '购买了', target: '隐刀', desc: '幻影刺客购买了隐刀。'},
                        {time: '00:19:36', hero:'斧王', action: '购买了', target: '黑皇杖', desc: '斧王购买了黑皇杖。'},
                        {time: '00:21:43', hero:'力丸', action: '购买了', target: '隐刀', desc: '力丸购买了隐刀。'}
                    ]
                },
                states: {
                    pager: {page: 1, recPerPage: 20}
                }
            })
        }
    }
});

function showApp(vue) {
    document.getElementById('app').style.display = 'block';
    vue.appShow = true;
}
