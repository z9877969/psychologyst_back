const Joi = require('joi');

const firstOrderValidating = Joi.object({
  phone: Joi.string()
    .regex(
      /^(\+?3?8)?0\d{9}$/,
      'phone must be valid phone number +380991234567'
    )
    .required(),
});

const promocodeDiscountValidating = Joi.object({
  code: Joi.string().length(8).required(),
});

module.exports = {
  firstOrderValidating,
  promocodeDiscountValidating,
};
