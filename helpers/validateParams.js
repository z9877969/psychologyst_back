const { createError } = require('./createError');

module.exports.validateParams = (schema) => (req, res, next) => {
  try {
    const { error } = schema.validate(req.params);
    if (error) {
      throw createError(400, error.message);
    }
    next();
  } catch (error) {
    next(error);
  }
};
