const Joi = require('joi');
const { User } = require('../database/models');

const userService = {
  validateBody: (data) => {
    const schema = Joi.object({
      displayName: Joi.string().required().min(8),
      email: Joi.string().email().required(),
      password: Joi.string().required().min(6),
      image: Joi.string().required(),
    });

    const { error, value } = schema.validate(data);

    if (error) throw error;
    
    return value;
  },

  create: async (data) => {
    const { email } = data;
    const getUser = await User.findOne({ where: { email } });
    if (getUser) {
      const e = new Error('User already registered');
      e.name = 'ConflictError';
      throw e;
    }

    await User.create(data);
  },

  findAll: async () => {
    const result = await User.findAll({ 
      attributes: { exclude: ['password'] } });
    if (!result) {
      const e = new Error('Something went wrong!');
      throw e;
    }
    return result;
  },

  findById: async (id) => {
    const result = await User.findByPk(id, {
      attributes: { exclude: ['password'] } });
    if (!result) {
      const e = new Error('User does not exist');
      e.name = 'NotFoundError';
      throw e;
    }
    return result;
  },

};

module.exports = userService;