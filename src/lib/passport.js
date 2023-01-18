const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use(
   'local.signin',
   new LocalStrategy(
      {
         usernameField: 'username',
         passwordField: 'password',
         passReqToCallback: true,
      },
      async (req, username, password, done) => {
         console.log(req.body);
         const users = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
         if (users.length > 0) {
            const user = users[0];
            console.log(typeof user.password, user.password);
            const result = await helpers.matchPasswords(password, user.password);
            if (result) {
               done(null, user, req.flash('success', `Welcome ${user.fullname}`));
            } else {
               done(null, false, req.flash('message', 'Invalid credentials'));
            }
         } else {
            return done(null, false, req.flash('message', 'Username does not exists'));
         }
      }
   )
);

passport.use(
   'local.signup',
   new LocalStrategy(
      {
         usernameField: 'username',
         passwordField: 'password',
         passReqToCallback: true,
      },
      async (req, username, password, done) => {
         const { fullname } = req.body;
         const user = {
            username,
            password,
            fullname,
         };
         user.password = await helpers.encryptPassword(password);
         const result = await pool.query('INSERT INTO users SET ?', [user]);
         user.id = result.insertId;
         return done(null, user);
      }
   )
);

passport.serializeUser((user, done) => {
   done(null, user.id);
});

passport.deserializeUser(async (userId, done) => {
   const rows = await pool.query('SELECT * FROM users WHERE id = ?', [userId]);
   done(null, rows[0]);
});
