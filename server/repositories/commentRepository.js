const Comment = require('../models/commentModel');

const createComment = async (commentData) => {
  const newComment = new Comment(commentData);
  return await newComment.save();
};

module.exports = {
  createComment
};
