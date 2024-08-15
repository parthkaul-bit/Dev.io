const authRepository = require('../repositories/authRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (userData) => {
    const existingUser = await authRepository.findUserByEmail(userData.email);
    if (existingUser) {
        throw new Error('Email already exists.');
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await authRepository.createUser({ ...userData, password: hashedPassword });
    return user;
};

exports.login = async (loginData) => {
    const user = await authRepository.findUserByEmail(loginData.email);
    if (!user || !await bcrypt.compare(loginData.password, user.password)) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return token;
};
