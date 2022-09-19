const Joi = require('joi');
const Sequelize = require('sequelize');
const { BlogPost, PostCategory, Category, User } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);
const { Op } = Sequelize;    

const postService = {
  validateBody: (data) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
      categoryIds: Joi.array().required().min(1),
    });
    const { error, value } = schema.validate(data);
    if (error) {
      if (error.message.includes('categoryIds')) {
        console.log(error);
        const e = new Error('"categoryIds" not found');
        e.name = 'ValidationError';
        throw e;
      }
      const e = new Error('Some required fields are missing');
        e.name = 'ValidationError';
        throw e;
    }
    return value;
  },

  validateUpdate: (data) => {
    const schema = Joi.object({
      title: Joi.string().required(),
      content: Joi.string().required(),
    });
    const { error, value } = schema.validate(data);
    if (error) {
      const e = new Error('Some required fields are missing');
        e.name = 'ValidationError';
        throw e;
    }
    return value;
  },

  create: async (data) => {
    const { categoryIds, post, userId } = data;
    const result = await sequelize.transaction(async (t) => {
      const [blogResult] = await BlogPost.findOrCreate({
        where: { title: post.title },
        defaults: { content: post.content, userId },
        transaction: t });

      await PostCategory.bulkCreate(categoryIds
        .map((item) => ({ postId: blogResult.dataValues.id, categoryId: item })),
        { transaction: t });
      return blogResult.dataValues;
    });
    return result;
  },

  findById: async (categoryIds) => {
    const result = await Category.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: categoryIds,
        },
      },
    });
    console.log(result);
    if (result.length !== categoryIds.length) {
      const e = new Error('"categoryIds" not found');
      e.name = 'ValidationError';
      throw e;
    }
    return result;
  },

  getPosts: async () => {
    const result = await BlogPost.findAll({
      include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } }],
    });
    if (!result) {
      const e = new Error('something went wrong');
      throw e;
    }
    return result;
  },

  findPostById: async (data) => {
    const result = await BlogPost.findByPk(data, {
      include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } }],
    });
    if (!result) {
      const e = new Error('Post does not exist');
      e.name = 'NotFoundError'; 
      throw e;
    }
    return result;
  },

  updatePost: async (userId, id, data) => {
    if (userId !== Number(id)) {
      const e = new Error('Unauthorized user');
      e.name = 'Authorization'; 
      throw e;
    }
    await BlogPost.update(data, { where: { id } });
  },

  deletePost: async (userId, id) => {
    const checkBlogId = await BlogPost.findOne({ where: { id } });
    if (!checkBlogId) {
      const e = new Error('Post does not exist');
      e.name = 'NotFoundError'; 
      throw e;
    }
    if (checkBlogId.userId !== userId) {
      const e = new Error('Unauthorized user');
      e.name = 'Authorization'; 
      throw e;
    }
    await BlogPost.destroy({ where: { id } });
  },

  searchPost: async (data) => {
    const query = `%${data}%`;
    const result = await BlogPost.findAll({
      where: { [Op.or]: [{ title: { [Op.like]: query } }, { content: { [Op.like]: query } }] },
      include: [{ model: User, as: 'user', attributes: { exclude: 'password' } },
      { model: Category, as: 'categories', through: { attributes: [] } }],
    });
    return result;
  },
};

module.exports = postService;