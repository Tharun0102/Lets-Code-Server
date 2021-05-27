const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/users');

router.get('/:userId', userControllers.getUser);

router.get('/:userId/projects', userControllers.getUserProjects);

router.post('/new', userControllers.createUser);


exports.userRoutes = router;