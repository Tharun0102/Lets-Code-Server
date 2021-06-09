const { Project } = require("../models/Project");
const { File } = require("../models/File");
const { get } = require("mongoose");

// creates a file
const createFile = async (req, res) => {
  console.log("file", req.body);
  const { id, projectId } = req.body;
  try {
    const file = new File({
      name: req.body.name,
      body: 'start coding!'
    });
    await file.save();
    const project = await Project.findOne({ _id: projectId });
    if (project) {
      project.files.push(file);
      await project.save();
      res.status(201).send(file);
    } else {
      res.status(500).send(file);
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}

const getFile = async (req, res) => {
  const { _id } = req.query;
  try {
    const file = await File.findOne({ _id });
    res.status(201).send(file);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}

const deleteFile = async (req, res) => {
  const { projectId, fileId } = req.body;
  try {
    const file = await File.findOne({ _id: fileId }).catch(err => console.log("file err"));
    const project = await Project.findOne({ _id: projectId }).catch(err => console.log("project err"));
    console.log(file, project);
    const index = project.files.indexOf(fileId);
    project.files.splice(index, 1);
    await project.save();
    await File.deleteOne(file);
    res.status(200).send(project);
  } catch (error) {
    res.status(404).send(error);
  }
}

exports.createFile = createFile;
exports.deleteFile = deleteFile;
exports.getFile = getFile;