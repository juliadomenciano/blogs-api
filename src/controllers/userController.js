const authService = require('../services/authService');
const userService = require('../services/userService');
const jwtService = require('../services/jwtService');

const userController = {
  create: async (req, res) => {
    const { email, password } = req.body;
    await userService.validateBody(req.body);
    await userService.create(req.body);
    const token = await authService.login(email, password);

    res.status(201).json({ token });
  },

  findAll: async (_req, res) => {
    const result = await userService.findAll();
    res.status(200).json(result);
  },

  findById: async (req, res) => {
    const { id } = req.params;
    const result = await userService.findById(id);
    res.status(200).json(result);
  },

  deleteMe: async (req, res) => {
    const { authorization } = req.headers;
    const { data } = await jwtService.validateToken(authorization);
    const userId = data.id;
    await userService.deleteMe(userId);
    res.status(204).send();
  },
};

module.exports = userController;