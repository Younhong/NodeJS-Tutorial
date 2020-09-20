var db = require('../lib/db');

module.exports = function(app) {
    var passport = require('passport'),
        LocalStrategy = require('passport-local').Strategy;
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    passport.serializeUser(function(user, done) {
      done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
      var user = db.get('users').find({id:id}).value();
      done(null, user);
    });
    
    passport.use(new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'pwd'
      },
      function(email, password, done) {
        var user = db.get('users').find({email:email, password:password}).value();
        if (user) {
            return done(null, user, {
              message: 'welcome'
            });
        } else {
            return done(null, false, { 
              message: 'Incorrect user info.' 
            });
        }
      }
    ));

    return passport;
}