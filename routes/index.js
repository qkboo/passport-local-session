var express = require('express');
var passport = require('passport');
var UserModel = require('../models/userModel');
var flash = require('connect-flash');
var router = express.Router();

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated())
      return next();
  req.flash('error', '인증이 필요한 페이지 입니다.!');
  res.redirect('/login' );
}

router.get('/', function (req, res) {
  res.render('index', { title: 'Passport', user : req.user });
});

router.get('/mypage', isAuthenticated, function (req, res) {
    res.render('mypage', { title: 'Authorized Area', 
                            user : req.user, 
                            messages: req.flash('error') || req.flash('info') });
  }
);

router.get('/register', function(req, res) {
  res.render('register', 
    { 
      title: 'Passport',
      messages: req.flash('error')
    });
});

router.post('/register', function(req, res) {
  var user = new UserModel(req.body);
  user.save( function(err) {
    if (err) {
      var message = getErrorMessage(err);
      req.flash('error', message);
      return res.redirect('/signup');
    }
  });
  res.redirect('/login');
});

router.get('/login', function(req, res) {
    res.render('login', 
      { 
        title: 'Passport', 
        user : req.user,
        messages: req.flash('error') || req.flash('info')
    });
});

router.post('/login', 
  passport.authenticate('local', {  successRedirect: '/', 
                                    failureRedirect: '/login',
                                    failureFlash: true })
);

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


// Create a new error handling controller method
var getErrorMessage = function(err) {
  // Define the error message variable
  var message = '';

  // If an internal MongoDB error occurs get the error message
  if (err.code) {
    switch (err.code) {
      // If a unique index error occurs set the message error
      case 11000:
      case 11001:
        message = 'Username already exists';
        break;
      // If a general error occurs set the message error
      default:
        message = 'Something went wrong';
    }
  } else {
    // Grab the first error message from a list of possible errors
    for (var errName in err.errors) {
      if (err.errors[errName].message) message = err.errors[errName].message;
    }
  }

  // Return the message error
  return message;
};

module.exports = router;