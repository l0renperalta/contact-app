const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Private
const getContacts = asyncHandler(async (req, res) => {
   const contact = await Contact.find();
   res.status(200).json(contact);
});

// @desc    Create a contact
// @route   POST /api/contacts
// @access  Private
const saveContact = asyncHandler(async (req, res) => {
   if (!req.body.contact) {
      res.status(400);
      throw new Error('Please provied a contact field');
   }

   const contact = await Contact.create({ contact: req.body.contact });
   res.status(200).json(contact);
});

// @desc    Update a contact
// @route   PUT /api/contacts/:id
// @access  Private
const updateContact = asyncHandler(async (req, res) => {
   const contact = await Contact.findById(req.params.id);
   if (!contact) {
      res.status(400);
      throw new Error('Contact not found');
   }

   const contactUpdated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
   res.status(200).json(contactUpdated);
});

// @desc    Delete a contact
// @route   DELETE /api/contacts/:id
// @access  Private
const deleteContact = asyncHandler(async (req, res) => {
   const contact = await Contact.findById(req.params.id);
   if (!contact) {
      res.status(400);
      throw new Error('Contact not found');
   }

   await contact.remove();
   res.status(200).json({ id: `Delete contact ${req.params.id}` });
});

module.exports = {
   getContacts,
   saveContact,
   updateContact,
   deleteContact,
};
