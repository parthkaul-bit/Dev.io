const likeService = require('../services/likeService');

exports.likeBlog = async (req, res) => {
    try {
        const { user_id, blog_id } = req.body;
        const like = await likeService.likeBlog(user_id, blog_id);
        res.status(201).json({ message: 'Blog liked successfully', like });
    } catch (error) {
        console.error('Error liking blog:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};

exports.unlikeBlog = async (req, res) => {
    try {
        const { user_id, blog_id } = req.body;
        await likeService.unlikeBlog(user_id, blog_id);
        res.status(200).json({ message: 'Blog unliked successfully' });
    } catch (error) {
        console.error('Error unliking blog:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};
