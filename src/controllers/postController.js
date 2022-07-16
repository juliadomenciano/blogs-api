// const categoriesService = require('../services/categoriesService');
const postService = require('../services/postService');
const jwtService = require('../services/jwtService');

const postController = {
  create: async (req, res) => {
    console.log(req.body);
    const { categoryIds, ...post } = req.body;
    const { authorization } = req.headers;
    await postService.validateBody(req.body);
    const { data } = await jwtService.validateToken(authorization);
    const userId = data.id;
    await postService.findById(categoryIds);
    const result = await postService.create({ categoryIds, post, userId });
    res.status(201).json(result);
  },

  // findAll: async (_req, res) => {
  //   const result = await postService.findAll();
  //   res.status(200).json(result);
  // },

  // findById: async (req, res) => {
  //   const { id } = req.params;
  //   const result = await postService.findById(id);
  //   res.status(200).json(result);
  // },
};

module.exports = postController;