require('dotenv/config');
const jwt = require('jsonwebtoken');

const jwtService = {
  createToken: (data) => {
    const token = jwt.sign({ data }, process.env.JWT_SECRET);
    return token;
  },

  validateToken: (data) => {
    try {
      const payload = jwt.verify(data, process.env.JWT_SECRET);
      return payload;
    } catch (e) {
      console.log('oi');
      const error = new Error('Expired or invalid token');
      error.name = 'Authorization';
      throw error; 
    }
  },
};

module.exports = jwtService;