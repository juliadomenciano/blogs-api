const categoriesService = require('../services/categoriesService');

const userController = {
  create: async (req, res) => {
    const { name } = req.body;
    console.log(name);
    await categoriesService.validateBody(req.body);
    await categoriesService.create(name);
    const result = await categoriesService.listByName(name);
    res.status(201).json(result);
  },

  // findAll: async (_req, res) => {
  //   const result = await userService.findAll();
  //   res.status(200).json(result);
  // },

  // findById: async (req, res) => {
  //   const { id } = req.params;
  //   const result = await userService.findById(id);
  //   res.status(200).json(result);
  // },
};

module.exports = userController;