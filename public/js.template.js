// FileName: js.template
// ProjectName: express-typescript
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
        vueTitle: 'welcome use vue template!'
    },
    mounted: function () {
        showApp(this);
    }
});

function showApp(vue) {
    document.getElementById('app').style.display = 'block';
    vue.appShow = true;
}
