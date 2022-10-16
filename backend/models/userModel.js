const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, 'Please provied a name'],
      },
      email: {
         type: String,
         required: [true, 'Please provied an email'],
         unique: true,
      },
      password: {
         type: String,
         required: [true, 'Please provied a password'],
      },
   },
   { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
