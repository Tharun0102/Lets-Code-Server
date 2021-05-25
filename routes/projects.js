const express = require('express');
const router = express.Router();
const projectControllers = require('../controllers/Projects');

router.get('/:userId/projects/:projectId', projectControllers.getProjectFiles);

router.post('/:userId/projects/new', projectControllers.createProject);

router.delete('/:userId/projects/:projectId/delete', projectControllers.deleteProject);

exports.projectRoutes = router;