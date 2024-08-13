const mongoose = require('mongoose');

// Blog Schema
const blogSchema = new mongoose.Schema({
  blog_id: {
    type: mongoose.Schema.Types.ObjectId,
    auto: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  body: {
    type: String,
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Like',
  }],
  views: {
    type: Number,
    default: 0,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tags: [{
    type: String,
  }],
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
}, { timestamps: true });


const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;