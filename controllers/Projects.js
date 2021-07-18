const { Project } = require("../models/Project");
const { User } = require("../models/user");
const { File } = require("../models/File");

const getProjectFiles = async (req, res) => {
  const { projectId } = req.query;
  try {
    const project = await Project.findOne({
      _id: projectId
    });
    res.status(201).send(project.files);
  } catch (error) {
    res.status(500).send(error);
  }
}

const getProjectById = async (req, res) => {
  const { projectId } = req.query;
  try {
    const project = await Project.findOne({
      _id: projectId
    });
    res.status(200).send(project);
  } catch (error) {
    res.status(500).send(error);
  }
}


const createProject = async (req, res) => {
  const { name, userId, type, isFav } = req.body;
  try {
    const project = new Project({
      name,
      userId,
      type,
      isFav
    });
    project.save()
      .then(() => {
        User.findOne({ _id: userId })
          .then((user) => {
            if (user) {
              user.projects.push(project);
              user.save()
                .then(() => res.send(project))
                .catch(err => res.status(500).send("cannot create!"))
            }
          })
          .catch(err => res.status(500).send(err))
      })
      .catch((error) => {
        res.status(404).send(error);
      })
  } catch (error) {
    res.status(404).send(error);
  }
}

const toggleFavourite = async (req, res) => {
  const { projectId } = req.body;
  try {
    const project = await Project.findOne({
      _id: projectId
    });
    project.isFav = !project.isFav;
    project.save();
    res.status(202).send(project);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}

const deleteProject = async (req, res) => {
  const { id, projectId } = req.query;
  try {
    const project = await Project.findOne({
      _id: projectId
    });
    const user = await User.findOne({ _id: id });
    user.projects = user.projects.filter(p => p != projectId);
    await user.save();
    project.files.forEach(async (file) => {
      const currFile = await File.findOne({ _id: file });
      await File.deleteOne(currFile);
    })

    await Project.deleteOne(project);
    res.status(202).send(project);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}

exports.getProjectFiles = getProjectFiles;
exports.getProjectById = getProjectById;
exports.createProject = createProject;
exports.deleteProject = deleteProject;
exports.toggleFavourite = toggleFavourite;