const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/create', (req, res) => {
   res.render('contacts/create');
});

router.post('/create', async (req, res) => {
   const { contact, number, description } = req.body;
   if (!contact || !number || !description) {
      res.send('Fields can not be empty');
   }
   const newContact = { contact, number, description };
   await pool.query('INSERT INTO contacts set ?', [newContact]);
   res.send('saved');
});

module.exports = router;
