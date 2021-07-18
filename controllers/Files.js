const { Project } = require("../models/Project");
const { File } = require("../models/File");

// creates a file
const createFile = async (req, res) => {
  const { projectId, type } = req.body;
  try {
    const project = await Project.findOne({ _id: projectId });
    const code = defaultCode(project.type);
    const file = new File({
      name: req.body.name + "." + convert[type],
      body: code,
      type: convert[type]
    });
    await file.save();
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
const convert = {
  "C": 'c',
  "C++": "cpp",
  "Java": 'java',
  "Javascript": 'js',
  "Python": 'py'
}
const updateFile = async (req, res) => {
  const { _id, data } = req.body;
  try {
    const file = await File.findOne({ _id: _id });
    file.body = data;
    await file.save();
    res.status(200).send(file);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
}

// default code
const defaultCode = (type) => {
  switch (type) {
    case "C":
      return `#include<stdio.h>\nint main(){\n    printf("Hello World!");\n}`
    case "C++":
      return `#include<iostream>\nusing namespace std;\nint main(){\n    cout<<"Hello World!";\n}`
    case "Java":
      return `class Main{\n    public static void main(String[] args){\n        System.out.println("Hello World!");\n    }\n}`
    case "JavaScript":
      return `console.log("Hello World")`;
    case "Python":
      return `print("Hello World")`
    default:
      return ""
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
exports.updateFile = updateFile;