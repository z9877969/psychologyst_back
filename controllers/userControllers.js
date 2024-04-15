const randomstring = require('randomstring');
const { Promocode } = require('../models');

const getFirstBuyDiscount = async (req, res, next) => {
  try {
    const { phone } = req.body;
    const buyer = await Buyer.findOneAndUpdate(
      { phone, firstBuy: { $eq: false } },
      { firstBuy: true }
    );
    
    res.status(201).json('Ok');
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = {
  getFirstBuyDiscount,
};
