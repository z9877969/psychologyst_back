const voucherCodes = require('voucher-code-generator');
const { Promocode } = require('../models');
const {
  promocode: { CHARSET },
} = require('../constants');
const { createError } = require('../helpers');

const createFirstBuyPromocode = async ({ discount, userPhone }) => {
  let isUnique = false;
  let newPromocode = '';
  while (!isUnique) {
    const codeList = voucherCodes.generate({
      count: 1,
      length: 8,
      charset: CHARSET,
    });
    newPromocode = codeList[0];
    const existingItem = await Promocode.findOne({ code: newPromocode });
    if (!existingItem) {
      isUnique = true;
    }
  }
  const createdPromo = await Promocode.create({
    discount,
    code: newPromocode,
    isFirstBuyPromo: true,
    userPhone,
  });
  return createdPromo;
};

const createPromocodesList = async ({ discount, count }) => {};

const getPromocodeDiscount = async (code) => {
  const promocode = await Promocode.findOne({ code });
  if (!promocode) {
    throw createError(400, 'Invalid promocode');
  }
  return promocode.discount;
};

module.exports = {
  createFirstBuyPromocode,
  createPromocodesList,
  getPromocodeDiscount,
};
