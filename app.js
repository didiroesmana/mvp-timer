var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors=require('cors');
var router = express.Router();

var config = require('./config');
var index = require('./routes/index');
var users = require('./routes/users');
var mvp = require('./routes/mvp');
var history = require('./routes/history');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

router.use(function (req, res, next) {

	if (!req.headers['x-auth-token'] && req.method == 'POST') {
		return ret403(res,'No token provided.');
	} else if (req.headers['x-auth-token'] && config.token.indexOf(req.headers['x-auth-token']) == -1) {
		return ret403(res,'Wrong token given');
	}

	next();
});

app.use(router);
app.use('/', index);
app.use('/users', users);
app.use('/api/mvp', mvp);
app.use('/api/history', history);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
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

function ret403(res,message) {
	return res.status(403).send({ 
		success: false, 
		message: message 
	});
}
module.exports = app;
