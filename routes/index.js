var express = require('express');
var passport = require('passport');
var UserModel = require('../models/userModel');
var flash = require('connect-flash');
var router = express.Router();
var bcrypt = require('bcrypt');

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
  UserModel.findOne({ username: req.body.username }, function(err, user) {
    if(user) {
      res.json(null);
      return;
    } else {
      var newUser = new UserModel(req.body);
      newUser.save( function(err) {
        if (err) {
          req.flash('error', err);
          return res.redirect('/signup');
        }
      });
      return res.redirect('/login');
    }
  })
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
                                    failureFlash: 'Invalid username or password.',
                                    successFlash: 'Welcome!' })
);

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;