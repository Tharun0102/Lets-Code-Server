const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema({
  username: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  projects: [{ type: schema.Types.ObjectId, ref: 'Project' }]
});

const User = mongoose.model('User', userSchema);

exports.User = User;

