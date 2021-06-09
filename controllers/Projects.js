const { Project } = require("../models/Project");
const { User } = require("../models/user");

const getProjectFiles = async (req, res) => {
  const { _id } = req.query;
  try {
    const project = await Project.findOne({
      _id
    });
    res.status(201).send(project.files);
  } catch (error) {
    res.status(500).send(error);
  }
}


const createProject = async (req, res) => {
  console.log("createProject");
  console.log(req.body);
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
              console.log(user);
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
  console.log("toggle", req.body);
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
  console.log(req.query);
  const { id, projectId } = req.query;
  try {
    const project = await Project.findOne({
      _id: projectId
    });
    const user = await User.findOne({ _id: id });
    user.projects = user.projects.filter(p => p != projectId);
    await user.save();
    console.log(user, project);
    await Project.deleteOne(project);
    res.status(202).send(project);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}

exports.getProjectFiles = getProjectFiles;
exports.createProject = createProject;
exports.deleteProject = deleteProject;
exports.toggleFavourite = toggleFavourite;