const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/users');

router.get('/:userId', userControllers.getUserDetails);

router.get('/files', userControllers.getUserFiles);

router.post('/new', userControllers.createUser);


exports.userRoutes = router;