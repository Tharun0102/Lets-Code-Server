const mongoose = require('mongoose');

const schema = mongoose.Schema;

const userSchema = new schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String },
  projects: [{ type: schema.Types.ObjectId, ref: 'Project' }]
});

const User = mongoose.model('User', userSchema);

exports.User = User;

