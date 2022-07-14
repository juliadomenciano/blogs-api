const authService = require('../services/authService');
const userService = require('../services/userService');

const userController = {
  create: async (req, res) => {
    const { email, password } = req.body;
    await userService.validateBody(req.body);
    await userService.create(req.body);
    const token = await authService.login(email, password);

    res.status(201).json({ token });
  },
};

module.exports = userController;