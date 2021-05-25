const mongoose = require('mongoose');

const fileSchema = mongoose.Schema({
  name: String,
  body: String
});

export const File = mongoose.model('File', fileSchema);

