const { User } = require("../models/user");
const { Project } = require("../models/Project");;

const getUser = async (req, res) => {
  if (!req.query) {
    res.send(400).send('error!')
  }
  try {
    const userDetails = await User.findOne(req.query);
    res.status(200).send(userDetails);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

const getUserProjects = async (req, res) => {
  try {
    const user = await User.findOne({ "_id": req.query.id });
    await user.populate('projects');
    const projects = user.projects;
    const response = await Promise.all(projects.map(async (id) => {
      const project = await findProjectById(id);
      return project;
    }))
    res.status(200).send(response);
  } catch (err) {
    res.status(404).send(err);
  }
}

const findProjectById = async (projectId) => {
  try {
    const project = await Project.findOne({ _id: projectId });
    return project;
  } catch (error) {
    console.error(error);
  }
}

const createUser = async (req, res) => {
  const user = req.body;
  const newUser = new User(user);
  try {
    await newUser.save();
    res.status(201).send(newUser);
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
}

exports.getUser = getUser;
exports.createUser = createUser;
exports.getUserProjects = getUserProjects;