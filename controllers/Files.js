const { Project } = require("../models/Project");
const { File } = require("../models/File");

const createFile = async (req, res) => {
  const { userId, projectId } = req.params;
  try {
    const file = new File({
      name: req.body.name
    });
    await file.save();
    const project = await Project.findOne({ username: userId, name: projectId });
    if (project) {
      project.files.push(file);
      await project.save();
      res.status(201).send('created!');
    } else {
      res.status(500).send(file);
    }
  } catch (error) {
    res.status(404).send(error);
  }
}

const deleteFile = async (req, res) => {
  const { userId, projectId, fileId } = req.params;
  try {
    const file = await File.findOne({ name: fileId });
    const project = await Project.findOne({ username: userId, name: projectId });
    const index = project.files.indexOf(file);
    project.files.splice(index, 1);
    await project.save();
    await File.deleteOne(file);
    res.status(200).send(file);
  } catch (error) {
    res.status(404).send(error);
  }
}

exports.createFile = createFile;
exports.deleteFile = deleteFile;