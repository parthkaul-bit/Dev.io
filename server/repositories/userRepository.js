const User = require('../models/userModel');

exports.findUserById = async (userId) => {
    return await User.findById(userId);
};

exports.createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

