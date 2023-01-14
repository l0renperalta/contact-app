const express = require('express');
const router = express.Router();

const pool = require('../database');

// List all contacts
router.get('/', async (req, res) => {
   const contacts = await pool.query('SELECT * FROM contacts');
   res.render('contacts/list', { contacts: contacts });
});

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
   req.flash('success', 'Contact created!');
   res.redirect('/contacts');
});

router.get('/edit/:id', async (req, res) => {
   const { id } = req.params;
   const values = await pool.query('SELECT * FROM contacts WHERE id = ?', id);
   console.log(values[0]);
   res.render('contacts/edit', { values: values[0] });
});

router.post('/edit/:id', async (req, res) => {
   const { id } = req.params;
   const { contact, number, description } = req.body;
   const newValues = {
      contact,
      number,
      description,
   };
   await pool.query('UPDATE contacts set ? WHERE id = ?', [newValues, id]);
   req.flash('success', 'Contact edited!');
   res.redirect('/contacts');
});

router.get('/delete/:id', async (req, res) => {
   const { id } = req.params;
   await pool.query('DELETE FROM contacts WHERE id = ?', id);
   req.flash('success', 'Contactd deleted!');
   res.redirect('/contacts');
});

module.exports = router;
