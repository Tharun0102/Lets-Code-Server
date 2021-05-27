const { User } = require("../models/user");

const getUser = async (req, res) => {
  try {
    const userDetails = await User.findOne(req.query);
    res.status(200).send(userDetails);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

const getUserProjects = async (req, res) => {
  console.log(req.query);
  try {
    const user = await User.findOne({ "_id": req.query.id });
    await user.populate('projects');
    console.log("user", user);
    res.status(200).send(user.projects);
  } catch (err) {
    res.status(404).send(err);
  }
}

const createUser = async (req, res) => {
  const user = req.body;
  console.log(user);
  const newUser = new User(user);
  try {
    await newUser.save();
    res.status(201).send(newUser);
    console.log("created!");
  } catch (error) {
    res.status(409).send({ message: error.message });
  }
}

exports.getUser = getUser;
exports.createUser = createUser;
exports.getUserProjects = getUserProjects;