const mongoose = require('mongoose');

const schema = mongoose.Schema;

const fileSchema = new schema({
  name: { type: String, required: true },
  content: { type: String }
});

const File = new mongoose.model('File', fileSchema);
exports.File = File;