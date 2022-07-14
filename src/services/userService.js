const Joi = require('joi');
const { User } = require('../database/models');

const authService = {
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

};

module.exports = authService;