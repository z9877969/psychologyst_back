const { Maker } = require('../models');

const getMakers = async (_, res, next) => {
  try {
    const makers = await Maker.find({});
    res.json(makers);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMakers,
};
