const mongoose = require('mongoose');

const contactSchema = mongoose.Schema(
   {
      user: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User',
         required: true,
      },
      contact: {
         type: String,
         required: [true, 'Please provied a contact'],
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);
