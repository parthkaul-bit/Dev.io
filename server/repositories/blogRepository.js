const Blog = require('../models/blogModel');
const Like = require('../models/likeModel'); 
const Comment = require('../models/commentModel'); 

exports.findAllBlogs = async () => {
    try {
        return await Blog.find().populate('author', 'username').populate('likes').populate('comments');
    } catch (error) {
        console.error('Error finding blogs:', error); 
        throw error;
    }
};

exports.findBlogById = async (blogId) => {
    try {
        const blog = await Blog.findById(blogId)
            .populate('author', 'username')
            .populate('likes')
            .populate('comments');
        
        return blog; 
    } catch (error) {
        console.error('Error finding blog by ID:', error);
        throw error;
    }
};

exports.createBlog = async (blogData) => {
    const blog = new Blog(blogData);
    return await blog.save();
};
