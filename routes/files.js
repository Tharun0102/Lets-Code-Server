const express = require('express');
const router = express.Router();
const fileControllers = require('../controllers/Files');

router.post('/files/new', fileControllers.createFile);

router.delete('/files/:fileId/delete', fileControllers.deleteFile);

exports.fileRoutes = router;