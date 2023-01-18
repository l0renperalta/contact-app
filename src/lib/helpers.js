const bcrypt = require('bcryptjs');

const helpers = {};

helpers.encryptPassword = async (password) => {
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(password, salt);
   return hashedPassword;
};

helpers.matchPasswords = async (password, savedPassword) => {
   try {
      console.log(password, savedPassword);
      return await bcrypt.compare(password, savedPassword);
   } catch (error) {
      console.log(error);
   }
};

module.exports = helpers;
