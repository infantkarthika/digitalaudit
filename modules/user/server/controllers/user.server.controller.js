'use strict';

/**
 * Module dependencies.
 */
 var path = require('path'),
 db = require(path.resolve('./config/lib/sequelize')),
 errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
 SHA256 = require("crypto-js/sha256"),
 passport = require('passport');
 const crypto = require('crypto'); 
 const secret = 'abcdefg';
 const nodemailer = require('nodemailer');
 const async = require('async');


/**
 * Signin after passport authentication
 */
 exports.signin = function(req, res, next) {  
 passport.authenticate('local', function(err, user, info) {  
   
    if (err || !user) {     
      res.status(400).send(info);
    } else {      
      req.login(user, function(err) {       
        if (err) {
          res.status(400).send(err);
        } else {         
          var userDetails = {
            userID:user.dataValues.site_user_id,
            username:user.dataValues.username,
            sfid:user.dataValues.sfid
          };         
          return res.json(user);
        }
      });
    }
  })(req, res, next);
};

/**
 * Verify users
 */
 exports.verify = function(req, res, next) {
  if (req.isAuthenticated()) {
      console.log(req.body + ' --- ' + res);
    res.send({state: 'success', user: req.user});
  } else {
    res.send({state: 'failure', user: null});
  }
};


/**
 * Signout
 */
 exports.signout = function(req, res) {
  console.log('ABC');
  req.session.destroy(function (err) {
    res.redirect('/');
  });
};


/**
 * Sign up  users
 */
 exports.signup = function(req, res) {
var hashpassword;
    hashpassword = crypto.createHmac('sha256', secret)
                   .update(req.body.data.password)
                   .digest('hex'); //req.body.data;   
   
   var formData = {
    username:req.body.data.username,
    password:hashpassword,
    sfid:req.body.data.sfid,
    active:req.body.data.active
  }      
    db.User.build(formData)
    .save().then(function(sfCreate) {      
      return res.json(sfCreate);                              
    })
    .catch(function(err) {     
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)        
      });
    });

};

/**
 * Update the change Password
 */
 exports.changepwd = function(req, res) {

  var formData = req.body;
  var formData = {
    site_user_id:req.body.data.site_user_id,
    password:crypto.createHmac('sha256', secret)
                   .update(req.body.data.password)
                   .digest('hex')
  } 
    console.log(formData);
  db.User.update(formData,
  {
    where: {
      site_user_id: formData.site_user_id 
    }
  }).then(function(updateStatus){
    return res.json(updateStatus);                              
  }).catch(function(err) {
    return res.status(400).send({
      message: errorHandler.getErrorMessage(err)
    });
  });
};

/**
 * forgot password 
 */
 exports.forgotpwd = function(req, res, next) {
 var formData;
  async.waterfall([
    function createRandomToken(done) {
      crypto.randomBytes(16, (err, buf) => {
        const token = buf.toString('hex');           
        done(err, token);        
      });
    },
    function setRandomToken(token, done) {
      db.User.findOne({ username: req.body.email }).then(function(user){       
        if (!user) {
          req.flash('errors', { msg: 'Account with that email address does not exist.' });
          return res.redirect('/forgot');
        }
        user.passwordResetToken = token;
        user.passwordResetExpires = Date.now() + 3600000 ;// 1 hour  
        user.save(function(err) {
        if (err){
            return res.send(err);
          }
        done(err, token, user);
    });


        console.log('124 - ',token,' - ',done,' - ',user);
      });
    },
    function sendForgotPasswordEmail(token, user, done) {
      console.log('131 - ',token,' - ',done,' - ',user);
      const transporter = nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USER,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
      const mailOptions = {
        to: 'vanvmari@gmail.com',//user.email,
        from: 'vanvmari@gmail.com.com',
        subject: 'Reset your password on Hackathon Starter',
        text: `You are receiving this email because you (or someone else) have requested the reset of the password for your account.\n\n
          Please click on the following link, or paste this into your browser to complete the process:\n\n
          http://${req.headers.host}/reset/${token}\n\n
          If you did not request this, please ignore this email and your password will remain unchanged.\n`
      };
      transporter.sendMail(mailOptions, (err) => {
        req.flash('info', { msg: `An e-mail has been sent to ${user.email} with further instructions.` });
        done(err);
      });
    }
  ], (err) => {
    if (err) { return next(err); }
    res.redirect('/forgot');
  });
};


