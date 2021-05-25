const express = require('express');
const router = express.Router();
const fileControllers = require('../controllers/Files');

router.post('/:userId/projects/:projectId/files/new', fileControllers.createFile);

router.delete('/:userId/projects/:projectId/files/:fileId/delete', fileControllers.deleteFile);

exports.fileRoutes = router;