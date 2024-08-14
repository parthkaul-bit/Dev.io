const Like = require('../models/likeModel');

exports.findLike = async (user_id, blog_id) => {
    try {
        return await Like.findOne({ user_id, blog_id });
    } catch (error) {
        console.error('Error finding like:', error);
        throw error;
    }
};

exports.createLike = async (likeData) => {
    try {
        const like = new Like(likeData);
        return await like.save();
    } catch (error) {
        console.error('Error creating like:', error);
        throw error;
    }
};

exports.deleteLike = async (user_id, blog_id) => {
    try {
        return await Like.findOneAndDelete({ user_id, blog_id });
    } catch (error) {
        console.error('Error deleting like:', error);
        throw error;
    }
};
