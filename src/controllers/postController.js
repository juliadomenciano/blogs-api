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

  getPosts: async (_req, res) => {
    const result = await postService.getPosts();
    res.status(200).json(result);
  },

  findPostById: async (req, res) => {
    const { id } = req.params;
    const result = await postService.findPostById(id);
    res.status(200).json(result);
  },

  updatePost: async (req, res) => {
    const { id } = req.params;
    const { authorization } = req.headers;
    const { data } = await jwtService.validateToken(authorization);
    const userId = data.id;
    await postService.validateUpdate(req.body);
    await postService.updatePost(userId, id, req.body);
    const result = await postService.findPostById(id);
    res.status(200).json(result);
  },

  deletePost: async (req, res) => {
    const { id } = req.params;
    const { authorization } = req.headers;
    const { data } = await jwtService.validateToken(authorization);
    const userId = data.id;
    await postService.deletePost(userId, id);
    res.status(204).send();
  },
};

module.exports = postController;