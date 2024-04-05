const Joi = require('joi');

const firstOrderValidating = Joi.object({
  userPhone: Joi.string()
    .regex(
      /^(\+?3?8)?0\d{9}$/,
      'phone must be valid phone number +380991234567'
    )
    .required(),
});

module.exports = {
  firstOrderValidating,
};
