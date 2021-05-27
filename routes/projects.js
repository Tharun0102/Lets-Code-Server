const express = require('express');
const router = express.Router();
const projectControllers = require('../controllers/Projects');

router.get('/:projectId', projectControllers.getProjectFiles);

router.post('/new', projectControllers.createProject);

router.delete('/:projectId/delete', projectControllers.deleteProject);

exports.projectRoutes = router;