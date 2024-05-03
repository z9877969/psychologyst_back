const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createError } = require('./createError');

const create = (payload, secretKey, expiresIn = '1h') => {
  const token = jwt.sign(payload, secretKey, { expiresIn });
  return token;
};

const verify = (token, secretKey) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw createError(401, 'Not authorized');
  }
};

const hash = async (password) => {
  return await bcrypt.hash(password, 10);
};

const compare = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

module.exports = {
  token: { create, verify },
  password: {
    hash,
    compare,
  },
};
