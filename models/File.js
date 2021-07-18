const mongoose = require('mongoose');

const schema = mongoose.Schema;

const fileSchema = new schema({
  name: { type: String, required: true },
  body: { type: String, required: true },
  type: { type: String, required: true }
});

const File = new mongoose.model('File', fileSchema);
exports.File = File;