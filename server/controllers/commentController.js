const commentService = require('../services/commentService');

exports.createComment = async (req, res) => {
  try {
    const { blog_id, user_id, comment } = req.body;

    if (!blog_id || !user_id || !comment) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newComment = await commentService.createComment(blog_id, user_id, comment);

    res.status(201).json({ message: 'Comment created successfully', comment: newComment });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};
