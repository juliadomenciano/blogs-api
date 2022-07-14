const Joi = require('joi');
const { Category } = require('../database/models');

const CategoriesService = {
  validateBody: (data) => {
    const schema = Joi.object({
      name: Joi.string().required(),
    });
    const { error, value } = schema.validate(data);
    if (error) throw error;
    return value;
  },

  create: async (data) => {
    const name = data;
    console.log(name);
    const getCategory = await Category.findOne({ where: { name } });
    if (getCategory) {
      const e = new Error('Category already registered');
      e.name = 'ConflictError';
      throw e;
    }
    await Category.create({ name });
  },

  listByName: async (data) => {
    const name = data;
    const getCategory = await Category.findOne({ where: { name } });
    if (!getCategory) {
      const e = new Error('Something went wrong!');
      throw e;
    }
    return getCategory;
  },

  // findById: async (id) => {
  //   const result = await User.findByPk(id, {
  //     attributes: { exclude: ['password'] } });
  //   if (!result) {
  //     const e = new Error('User does not exist');
  //     e.name = 'NotFoundError';
  //     throw e;
  //   }
  //   return result;
  // },

};

module.exports = CategoriesService;