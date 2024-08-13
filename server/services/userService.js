const userRepository = require('../repositories/userRepository');

exports.getUserById = async (userId) => {
    return await userRepository.findUserById(userId);
};

exports.createUser = async (userData) => {
    return await userRepository.createUser(userData);
};
