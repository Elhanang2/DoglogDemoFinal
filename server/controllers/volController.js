const mongoose = require('mongoose');
const Volunteer = mongoose.model('Volunteer');
const authenticationUtils = require('../utils/authentication');

exports.Login = (req, res) => {

}

exports.Signup = (req, res) => {

};

exports.updateAccount = (req, res) => {
    
}

exports.validateSignup = (req, res, next) => {
    req.sanitizeBody('name');
    req.checkBody('name', 'You must supply a name!').notEmpty();
    req.checkBody('email', 'Please input your email address').isEmail();
    req.sanitizeBody('email').normalizeEmail({
        remove_dots: false,
        remove_extension: false,
        gmail_remove_subaddress: false
    });
    req.checkBody('password', 'Password cannot be blank!!!').notEmpty();
    req.checkBody('password-confirm', 'Must confirm password!').notEmpty();
    req.checkBody('password-confirm', 'Uh oh! Your passwords do not match!').equals(req.body.password);

    const errors = req.validationErrors();
    if (errors) {
        req.flash('error', errors.map(err => err.msg));
        return;
    }
    next();
};

exports.Signup =  (req, res, next) => {
    const volunteer = new Volunteer({ 
        email: req.body.email, 
        fname: req.body.fname, 
        lname: req.body.lname, 
        password: authenticationUtils.hashPassword(req.body.password)
    });

     volunteer.save().then((data) => {
         res.json(data)
     }).catch(err => {
         console.log('Error');
         console.log(err);
         res.sendStatus(500);
     })
};

exports.account = (req, res) => {

}; 