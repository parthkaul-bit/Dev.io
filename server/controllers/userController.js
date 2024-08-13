const UserService = require('../services/userService');

exports.getUserById = async (req, res) => {
    try {
        const user = await UserService.getUserById(req.params.user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { username, email, password, avatar, about } = req.body;
        const newUser = await UserService.createUser({ username, email, password, avatar, about });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', error });
    }
};
