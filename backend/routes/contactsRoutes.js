const express = require('express');
const router = express.Router();
const {
   getContacts,
   saveContact,
   updateContact,
   deleteContact,
} = require('../controllers/contactController');

router.route('/').get(getContacts).post(saveContact);
router.route('/:id').put(updateContact).delete(deleteContact);

module.exports = router;
