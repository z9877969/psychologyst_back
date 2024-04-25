const { User } = require('../models');

const getFirstBuyDiscount = async (req, res, next) => {
  try {
    const { phone } = req.body;
    const user = await User.findOneAndUpdate(
      { phone, firstBuy: { $eq: false } },
      { firstBuy: true },
      { projection: { createdAt: 0, updatedAt: 0 } }
    );

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, '-createdAt -updatedAt');
    res.json(users);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFirstBuyDiscount,
  getUsers,
};
