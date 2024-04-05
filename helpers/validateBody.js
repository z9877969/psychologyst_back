const { createError } = require('./createError');

module.exports.validateBody = (schema) => (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    next();
  } catch (error) {
    next(error);
  }
};
