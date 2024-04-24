const { Category, Maker } = require('../models');

const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({}, '-createdAt -updatedAt');
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const getFilters = async (req, res, next) => {
  try {
    const categories = await Category.find({}, '-createdAt -updatedAt');
    const makers = await Maker.find({}, '-createdAt -updatedAt');
    res.json({ categories, makers });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategories,
  getFilters,
};
