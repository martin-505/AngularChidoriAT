var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
var apiRouter = require('./routes/api');
var cors = require('cors');
var methodOverride = require('method-override');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
const passport = require('passport');


const MONGO_URL = "mongodb://localhost:27017/zombie_school";
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL, {
    useFindAndModify: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

app.use(cors({
    origin: 'http://localhost:4200'
}));

// view engine setup
app.use(session({
    secret: 'Secreto',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new MongoStore({
        url: MONGO_URL,
        autoReconnect: false
    })
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/css', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free'));

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

mongoose.connect("mongodb://localhost:27017/zombie_school", {
    useFindAndModify: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});