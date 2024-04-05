const { Promocode } = require('../models');
const { generatePromoCode } = require('../helpers');

const createPromocode = async ({ discount, isFirstByPromo }) => {
  const code = generatePromoCode(10);
  const promo = await Promocode.create({ discount, code, isFirstByPromo });
  return promo;
};

module.exports = {
  createPromocode,
};
