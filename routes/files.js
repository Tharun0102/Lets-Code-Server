const express = require('express');
const router = express.Router();
const fileControllers = require('../controllers/Files');

router.post('/files/new', fileControllers.createFile);

router.get('/files/:fileId', fileControllers.getFile);

router.delete('/files/:fileId/delete', fileControllers.deleteFile);

exports.fileRoutes = router;