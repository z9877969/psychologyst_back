const Joi = require('joi');
const {
  order: { REGEX, PAYMENT_METHOD },
} = require('../constants');

const productItemSchema = Joi.object({
  title: Joi.string().required(),
  color: Joi.string().required(),
  flavor: Joi.string().required(),
  volume: Joi.string().min(0).max(99999).required(),
  amount: Joi.number().min(0).required(),
  price: Joi.number().min(0).required(), // 'Product price',
  salePrice: Joi.number().min(0).required(), // 'Product salePrice',
});

const orderCreatingSchema = Joi.object({
  orderNum: Joi.string().required(),
  products: Joi.array().items(productItemSchema),
  orderSum: Joi.number().min(1).required(), // order total sum
  promocode: Joi.string().length(8), // 'Xh5jhGO2',
  discount: Joi.number().min(0),
  discountedOrerSum: Joi.number().min(0).required(), // sum of order with discount by promocode
  delivery: Joi.object({
    phone: Joi.string().regex(REGEX.PHONE).required(), //'User phone'
    name: Joi.string().max(64).regex(REGEX.NAME).required(), // 'User full name'
    city: Joi.string().required(), // 'delivery city'
    postOffice: Joi.string().required(), // 'delivery post office',
    comments: Joi.string().max(300), // 'some user comment',
  }),
  paymentMethod: Joi.string()
    .valid(PAYMENT_METHOD.CARD, PAYMENT_METHOD.CASH)
    .required(),
});

module.exports = {
  orderCreatingSchema,
};
