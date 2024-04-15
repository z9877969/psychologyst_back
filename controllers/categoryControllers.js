const { Category } = require('../models');

const getCategories = async (_, res, next) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
};
