var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const bodyParser = require('body-parser');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const emailService = require('./services/emailService');
const config =  require('./config/config')

/** Add APIs Here */
var authentication = require('./api/AuthenticationAPI');
var profile = require('./api/UserProfileAPI');
var user = require('./api/UserAPI');
var master = require('./api/MasterAPI');
var userRole = require('./api/UserRoleAPI');
const useraccess = require('./api/UserAccessAPI');
const policy = require('./api/PolicyAPI');
const lead = require('./api/LeadAPI');
const report = require('./api/ReportAPI');
const dashboard = require('./api/DashboardAPI');
const common = require('./api/CommonAPI');
const security = require('./api/SecurityAPI');
const company = require('./api/CompanyAPI');
var plans = require('./api/PlansAPI');

var app = express();
MySQL = require('./MySqlConnect');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

console.log(`NODE_ENV=${config.NODE_ENV}`);

// app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'document')));
// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use('/', indexRouter);
app.use('/users', usersRouter);

/** Add Controllers Here */
app.use('/authentication', authentication);
app.use('/profile', profile);
app.use('/user', user);
app.use('/master', master);
app.use('/userRole', userRole);
app.use('/useraccess', useraccess);
app.use('/policy', policy);
app.use('/lead', lead);
app.use('/report', report);
app.use('/dashboard', dashboard);
app.use('/common', common);
app.use('/security', security);
app.use('/plans',plans);
app.use('/company',company);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
