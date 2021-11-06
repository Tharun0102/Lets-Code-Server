const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/users');

router.post('/user/get', userControllers.getUser);

router.post('/user/login', userControllers.login);

router.get('/:userId/projects', userControllers.getUserProjects);

router.post('/new', userControllers.createUser);


exports.userRoutes = router;