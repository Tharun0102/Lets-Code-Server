const { User } = require("../models/user");

const getUserDetails = async (req, res, err) => {
  console.log("userDetails", req.params.userId);
  try {
    const userDetails = await User.findOne({ "username": req.params.userId });

    res.status(200).json(userDetails);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
}

const getUserProjects = async (req, res, err) => {
  const userId = req.params.userId;
  try {
    User.findOne({ username: userId })
      .populate('projects')
      .then((user) => {
        res.status(200).send(user.projects);
      })
      .catch(err => {
        res.status(200).send(err);
      })
  } catch (err) {
    res.status(200).send(err);
  }
}

const createUser = async (req, res) => {
  const user = req.body;
  const newUser = new User(user);
  try {
    await newUser.save();
    res.status(201).json(newUser);
    console.log("created!");
  } catch (error) {
    res.send(409).json({ message: error.message });
  }
}

exports.getUserProjects = getUserProjects;
exports.createUser = createUser;
exports.getUserDetails = getUserDetails;