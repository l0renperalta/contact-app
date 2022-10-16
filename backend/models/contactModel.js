const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
   {
      contact: {
         type: String,
         required: [true, 'Please provied a contact'],
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
