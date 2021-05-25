const mongoose = require('mongoose');

const schema = mongoose.Schema;

const projectSchema = new schema({
  name: { type: String, required: true },
  username: { type: String, required: true },
  files: [{ type: schema.Types.ObjectId, ref: 'File' }]
});

const Project = mongoose.model('Project', projectSchema);
exports.Project = Project;