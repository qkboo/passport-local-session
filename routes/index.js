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

router.post('/register', function(req, res, next) {

  UserModel.register( new UserModel({username: req.body.username}), req.body.password, function(err) {
    if (err) {
      console.log('error while user register!', err);
      req.flash('error', err);
      return next(err);
    }
    res.redirect('/login');
  });

  // var user = new UserModel(req.body);
  // user.save( function(err) {
  //   if (err) {
  //     req.flash('error', err);
  //     return res.redirect('/signup');
  //   }
  // });
  // res.redirect('/login');
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


module.exports = router;