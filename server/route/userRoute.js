const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route to get user by ID
router.get('/:user_id', userController.getUserById);

// Route to create a new user
router.post('/', userController.createUser);

module.exports = router;
