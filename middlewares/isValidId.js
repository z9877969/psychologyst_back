const { isValidObjectId } = require('mongoose');
const { createError } = require('../helpers');

const isValidId = (req, res, next) => {
  try {
    const invalidId = Object.entries(req.params).find(
      ([key, value]) =>
        key.toLowerCase().includes('id') && !isValidObjectId(value)
    );
    if (invalidId) {
      throw createError(400, `${invalidId[0]} parametr has invalid id value`);
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = isValidId;
