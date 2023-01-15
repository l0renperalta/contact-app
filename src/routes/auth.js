const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/signup', (req, res) => {
   res.render('auth/signup');
});

router.post('/signup', async (req, res) => {
   const { fullname, username, password } = req.body;
   if (!fullname || !username || !password) {
      res.send('Fields can not be empty');
   } else {
      const credentials = {
         fullname,
         username,
         password,
      };
      await pool.query('INSERT INTO users set ?', [credentials]);
      res.redirect('login');
   }
});

router.get('/login', (req, res) => {
   res.render('auth/login');
});

router.post('/login', async (req, res) => {
   const { username, password } = req.body;
   if (!username || !password) {
      res.send('Fields can not be empty');
   } else {
      const user = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
      if (user.length === 0 || user[0].password !== password) {
         res.send('Invalid credentials');
      } else {
         req.session.user_id = user[0].id;
         res.redirect('contacts');
      }
   }
});

router.get('/logout', (req, res) => {
   req.session.destroy();
   res.send('logout');
});

module.exports = router;
