var mongoose = require('mongoose');
//var bcrypt   = require('bcrypt-nodejs');

var UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  email: String
});

UserSchema.methods.verifyPassword = function(password) {
  return password === this.password;
};

module.exports = mongoose.model('User', UserSchema);
