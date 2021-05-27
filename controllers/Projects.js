const { Project } = require("../models/Project");
const { User } = require("../models/user");

const getProjectFiles = async (req, res) => {
  const { userId, projectId } = req.params;
  try {
    const project = await Project.findOne({ username: userId, name: projectId });
    res.status(201).send(project.files);
  } catch (error) {
    res.status(500).send(error);
  }
}

const createProject = async (req, res) => {
  try {
    const project = new Project({
      name: req.body.name,
      username: req.body.email
    });
    project.save()
      .then(() => {
        User.findOne({ email: project.username })
          .then((user) => {
            if (user) {
              console.log(user);
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

const deleteProject = async (req, res) => {
  console.log(req.params);
  const { userId, projectId } = req.params;
  try {
    console.log(userId, projectId);
    const project = await Project.findOne({ username: userId, name: projectId });
    console.log("project: ", project);
    const user = await User.findOne({ email: userId });
    console.log("user: ", user);
    const index = user.projects.indexOf(project);
    user.projects.splice(index, 1);
    await user.save();
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