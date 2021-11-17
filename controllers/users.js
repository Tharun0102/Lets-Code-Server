const { User } = require("../models/user");
const { Project } = require("../models/Project");
const { scryptSync, randomBytes, timingSafeEqual } = require('crypto');

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).send("invalid credentials!");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).send("user not found!");
  } else {
    const [salt, key] = user.password.split(':');
    const hashedBuffer = scryptSync(password, salt, 64);

    const keyBuffer = Buffer.from(key, 'base64');
    const match = timingSafeEqual(hashedBuffer, keyBuffer);

    if (match) {
      res.status(200).send(user);
    } else {
      res.status(404).send("user not found!");
    }
  }
}


const getUser = async (req, res) => {
  if (!req?.body?.email) {
    res.status(400).send('error!')
  }
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(500).send("incorrect credentials");
    } else {
      res.status(200).send(user);
    }
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
  const { name, email, password } = req.body;
  const hasUser = await User.findOne({ email });
  if (hasUser) {
    res.status(400).send("user already exists")
  } else {
    const salt = randomBytes(16).toString('base64');
    const hashedPassword = scryptSync(password, salt, 64).toString('base64');
    const newUser = new User({ name, email, password: `${salt}:${hashedPassword}` });
    try {
      await newUser.save();
      res.status(201).send(newUser);
    } catch (error) {
      res.status(500).send("error!");
    }
  }
}

exports.login = login;
exports.getUser = getUser;
exports.createUser = createUser;
exports.getUserProjects = getUserProjects;