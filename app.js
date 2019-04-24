var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var ejs = require('ejs');
var { Token } = require('./bundles/common/common');

var indexRouter = require('./bundles/index.js');
var adminRouter = require('./bundles/views/adminViews.js');
var api = require('./bundles/apis/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'html');
app.engine('html', ejs.__express);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));

// 自定义中间件
app.use(async function (req, res, next) {
  let resType = req.headers.restype;
  let token = req.headers.token;
  let result = await Token.check(token);
  if (result.data || req.originalUrl == '/api/add-user' || req.originalUrl == '/api/login' || (req.originalUrl.indexOf('/admin') != -1)) { next() } else {
      console.log(resType);
      if (resType) {
        res.json(result)
      } else {
        res.redirect('/admin/login')
      }
  }

  // if (resType) {
  //     res.json(result);
  // }
  // next();
});

// 路由
app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
