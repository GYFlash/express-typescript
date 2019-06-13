// FileName: ff-ui
// ProjectName: express-typescript
// 作者: 区区电脑
// CreateTime: 2019/6/13

(function (w) {
    const FFUIName = 'ff-ui';
    const getRandom = function () {
        return parseInt(Math.random() * 1000000000);
    };
    let FFUI = {};

    // 消息提示
    let Alert = {
        AlertType: {
            success: 'success',
            warning: 'warning',
            error: 'error',
            normal: 'normal'
        },
        AlertPosition: {
            top: 'top',
            bottom: 'bottom',
            center: 'center'
        }
    };
    Alert.show = function (options) {
        let message = options.message || FFUIName;
        let type = options.type || Alert.AlertType.normal;
        let position = options.position || Alert.AlertPosition.top;
        let alertView = document.createElement('div');
        let id = getRandom();
        alertView.id = `alertView_${id}`;
        alertView.className = `ff-alert ff-alert-${type} ff-alert-${position}`;
        alertView.innerHTML = message;
        document.body.appendChild(alertView);
        let timeoutShow = setTimeout(function () {
            let width = alertView.clientWidth;
            alertView.style.width = width + 'px';
            if (position === Alert.AlertPosition.top) {
                alertView.style.transform = 'translateY(0px)';
                alertView.style.left = (document.body.clientWidth - width) / 2 + 'px';
            } else if (position === Alert.AlertPosition.center) {
                alertView.style.transform = 'scale(1)';
                alertView.style.left = (document.body.clientWidth - width - 10) / 2 + 'px';
            } else if (position === Alert.AlertPosition.bottom) {
                alertView.style.transform = 'translateY(-50px)';
                alertView.style.left = (document.body.clientWidth - width - 10) / 2 + 'px';
            }
            clearTimeout(timeoutShow);
            timeoutShow = null;
        }, 10);
        let timeoutHide = setTimeout(function () {
            let timeoutAnimation = setTimeout(function () {
                alertView.remove();
                clearTimeout(timeoutHide);
                clearTimeout(timeoutAnimation);
                timeoutHide = null;
                timeoutAnimation = null;
            }, 500);
            if (position === Alert.AlertPosition.top) {
                alertView.style.transform = 'translateY(-200px)';
            } else if (position === Alert.AlertPosition.center) {
                alertView.style.transform = 'scale(0)';
            } else if (position === Alert.AlertPosition.bottom) {
                alertView.style.transform = 'translateY(200px)';
            }
        }, 3000);
    };

    FFUI.Alert = Alert;
    FFUI.alert = function (options) {
        if (typeof options === 'string') {
            Alert.show({
                message: options
            })
        } else {
            Alert.show(options)
        }
    };
    // 消息弹框
    // 加载动画

    w.$FFUI = FFUI;
})(window);
