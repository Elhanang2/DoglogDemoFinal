const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const Volunteer = mongoose.model('Volunteer');
const promisify = require('es6-promisify');


exports.Login = passport.authenticate('local');

    
exports.Logout = (req, res) => {
    req.Logout();
    req.flash('success', 'You have logged out!');
    res.redirect('/');
  };
  
  exports.isLoggedIn = (req, res, next) => {

    if (req.isAuthenticated()) {
      next(); 
      return;
    }
    req.flash('error', 'Sorry, you need to log in to do that!');
    res.redirect('/Login');
  };