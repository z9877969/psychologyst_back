const Joi = require('joi');
const { isValidObjectId } = require('mongoose');
const { products } = require('../constants');

const { AGE, USER_TYPE, WATERMARK } = products;

// Схема для об'єкта з полями title і list
const itemsWithTitleSchema = Joi.object({
  title: Joi.string().required(),
  items: Joi.array().items(Joi.string()).required(),
});

// Схема для об'єкта з полем paragraph
const paragraphSchema = Joi.object({
  paragraph: Joi.string().required(),
});

const productAddingSchema = Joi.object({
  title: Joi.string().required(),
  subtitle: Joi.string().required(),
  description: Joi.array().items(
    Joi.alternatives().try(itemsWithTitleSchema, paragraphSchema)
  ),
  recomendation: Joi.string().required(),
  category: Joi.string()
    .custom((value, helpers) => {
      if (!isValidObjectId(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }, 'MongoDB ObjectId')
    .required(),
  maker: Joi.string()
    .custom((value, helpers) => {
      if (!isValidObjectId(value)) {
        return helpers.error('any.invalid');
      }
      return value;
    }, 'MongoDB ObjectId')
    .required(),
  userType: Joi.string().valid(
    USER_TYPE.ADULT,
    USER_TYPE.CHILD,
    USER_TYPE.ANIMAL
  ),
  age: Joi.array().items(Joi.valid(AGE['0TO3'], AGE['4TO6'], AGE['6TO12'])),
  watermark: Joi.string().valid(WATERMARK.WOW, WATERMARK.SALE),
});

module.exports = {
  productAddingSchema,
};
