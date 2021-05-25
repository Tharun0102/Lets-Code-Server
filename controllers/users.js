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

const getUserFiles = async (req, res, err) => {
  try {
    const fileList = await User.find();
    console.log(fileList);
    res.status(200).send(fileList);
  } catch (error) {
    console.error(error);
    res.status(404);
  }

}

const createUser = async (req, res) => {
  const user = req.body;
  console.log("req ", req.body);
  const newUser = new User(user);
  try {
    await newUser.save();
    res.status(201).json(newUser);
    console.log("created!");
  } catch (error) {
    res.send(409).json({ message: error.message });
  }
}

exports.getUserFiles = getUserFiles;
exports.createUser = createUser;
exports.getUserDetails = getUserDetails;