const Joi = require('joi');
const Sequelize = require('sequelize');
const { BlogPost, PostCategory, Category } = require('../database/models');
const config = require('../database/config/config');

const sequelize = new Sequelize(config.development);

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

};

module.exports = postService;