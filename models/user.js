const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  email: String,
  username: String,
  password: String,
  files: [String]
});

const User = mongoose.model('User', userSchema);

exports.User = User;

