const { Category } = require('../models');

const getCategoriesList = async (req, res, next) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategoriesList,
};
