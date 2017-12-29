var mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var http = require('http');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
// var cookieSession = require('cookie-session');
var flash = require('connect-flash');
var UserModel = require('./models/userModel');

var PORT = process.env.PORT || 3000;
mongoose.dsn =  'mongodb://' + process.env.DB_USERNAME 
      + ':' + process.env.DB_PASSWORD 
      + '@' + process.env.DB_SERVER
      + ':27017/' + process.env.DATABASE;

// passport config
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy( UserModel.authenticate()));

// passport.use( new LocalStrategy( 
//   function(username, password, done) {
//     UserModel.findOne({
//           username: username.toLowerCase()
//         }, function(err, user) {
//          if (err) { return done(err); }
//          if (!user) { return done(null, false); }
//          if (!user.verifyPassword(password)) { return done(null, false); }
//          return done(null, user);
//       });
//   })//LocalStrategy
// );

// use static serialize and deserialize of model for passport session support
passport.serializeUser(UserModel.serializeUser());
passport.deserializeUser(UserModel.deserializeUser());


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('express-session')({
    secret: '!@#$%%$%^$^',
    resave: false,
    saveUninitialized: false
}));

// passport Initialize
app.use(passport.initialize());
app.use(passport.session());

var routes = require('./routes/index');
// var users = require('./routes/users');

app.use('/', routes);

// mongoose
mongoose.Promise = global.Promise;
mongoose.connect(mongoose.dsn, { useMongoClient: true });


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

var server = http.createServer(app);

app.listen(process.env.PORT, function() {
  console.log('Server running at http://localhost:/', process.env.PORT);
});
