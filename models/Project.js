const mongoose = require('mongoose');

const schema = mongoose.Schema;

const projectSchema = new schema({
  name: { type: String, required: true },
  userId: { type: String, required: true },
  type: { type: String, required: true },
  isFav: { type: Boolean, required: true },
  files: [{ type: schema.Types.ObjectId, ref: 'File' }]
});

const Project = mongoose.model('Project', projectSchema);
exports.Project = Project;