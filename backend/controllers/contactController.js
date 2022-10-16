const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');
const User = require('../models/userModel');

// @desc    Get all contacts
// @route   GET /api/contacts
// @access  Private
const getContacts = asyncHandler(async (req, res) => {
   const contact = await Contact.find({ user: req.user.id });
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

   const contact = await Contact.create({
      user: req.user.id,
      contact: req.body.contact,
   });
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

   const user = await User.findById(req.user.id);

   // Check for user
   if (!user) {
      res.status(401);
      throw new Error('User not found');
   }

   if (contact.user.toString() !== user.id) {
      res.status(401);
      throw new Error('User not authorized');
   }

   const contactUpdate = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
   res.status(200).json(contactUpdate);
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

   const user = await User.findById(req.user.id);

   // Check for user
   if (!user) {
      res.status(401);
      throw new Error('User not found');
   }

   if (contact.user.toString() !== user.id) {
      res.status(401);
      throw new Error('User not authorized');
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
