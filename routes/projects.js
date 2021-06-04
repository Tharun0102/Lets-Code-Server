const express = require('express');
const router = express.Router();
const projectControllers = require('../controllers/Projects');

router.get('/:projectId/files', projectControllers.getProjectFiles);

// router.get('/:projectId', projectControllers.findProjectById);

router.post('/new', projectControllers.createProject);

router.delete('/:projectId', projectControllers.deleteProject);

exports.projectRoutes = router;