var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');
var db = require('../lib/db');
var shortid = require('shortid');

module.exports = function(passport) {
  router.get('/login', function(request, response) {
    var fmsg = request.flash();
    var feedback = '';
    if (fmsg.error) {
      feedback = fmsg.error[0];
    }
    var title = 'WEB - login';
          
    var list = template.list(request.list);
    var html = template.html(title, list, 
      `
        <div style="color:red;">${feedback}</div>
        <form action="/auth/login_process" method="POST">
          <p><input type="text" name="email" placeholder="email"></p>
          <p><input type="password" name="pwd" placeholder="password"></p>
          <p><input type="submit" value="login"></p>
        </form>
      `, '');
        
    response.send(html);
  });
  
  router.post('/login_process',
    passport.authenticate('local', { 
      successRedirect: '/',
      failureRedirect: '/auth/login',
      failureFlash: true,
      successFlash: true
    })
  );

  router.get('/register', function(request, response) {
    var fmsg = request.flash();
    var feedback = '';
    if (fmsg.error) {
      feedback = fmsg.error[0];
    }
    var title = 'WEB - register';
          
    var list = template.list(request.list);
    var html = template.html(title, list, 
      `
        <div style="color:red;">${feedback}</div>
        <form action="/auth/register_process" method="POST">
          <p><input type="text" name="email" placeholder="email" value="younhong@kakao.com"></p>
          <p><input type="password" name="pwd" placeholder="password" value="77777"></p>
          <p><input type="password" name="pwd2" placeholder="password" value="77777"></p>
          <p><input type="text" name="displayName" placeholder="display name" value="younhong"></p>
          <p><input type="submit" value="register"></p>
        </form>
      `, '');
        
    response.send(html);
  });

  router.post('/register_process', function(request, response) {
    var post = request.body;
    var email = post.email;
    var pwd = post.pwd;
    var pwd2 = post.pwd2;
    var displayName = post.displayName;

    if (pwd !== pwd2) {
      request.flash('error', 'Password must be same');
      response.redirect('/auth/register');
    } else {
      var user = {
        id: shortid.generate(),
        email: email,
        password: pwd,
        displayName: displayName
      }
      db.get('users').push(user).write();
      request.login(user, function(err) {
        return response.redirect('/');
      });
    }
  });
  
  router.get('/logout', function(request, response) {
    request.logout();
    request.session.save(function(err) {
      response.redirect('/');
    });
  });

  return router;
};