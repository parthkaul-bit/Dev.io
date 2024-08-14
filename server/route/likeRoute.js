const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController');

// Route to like a blog
router.post('/', likeController.likeBlog);

// Route to unlike a blog
router.delete('/', likeController.unlikeBlog);

module.exports = router;
