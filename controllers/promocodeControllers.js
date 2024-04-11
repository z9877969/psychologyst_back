const { generatePromoCode, createError } = require('../helpers');
const { Promocode, User } = require('../models');
const { promocodesServices: s } = require('../services');

const createPromocodeList = async (req, res, next) => {
  try {
    /* {
      phone,
      discount,
      dedline,
      
    } = body */
    const { discount } = req.body;
    const promocode = generatePromoCode(10);
    // let isPromocodeExist = await Promocode.find({promocode});
    // while (isPromocodeExist) {
    //   if(isPromocodeExist) {
    //     isPromocodeExist = await Promocode.find({promocode});
    //   }
    // }

    /* 
      const valuesList = ["value1", "value2", "value3"]; // ваш зовнішній масив зі значеннями

      // Припустимо, у вас є колекція 'yourCollection' з документами, у яких є поле 'someField'

      // Запит до бази даних для вибору документів, де значення поля 'someField' знаходиться в 'valuesList'
      db.yourCollection.find({
        someField: { $in: valuesList }
});
    */

    const promo = await Promocode.create({
      ...req.body,
      promocode,
    });
    res.status(201).json(promo);
  } catch (error) {
    next(error);
  }
};

const createFirstOrderPromocode = async (req, res, next) => {
  try {
    const { phone } = req.body;
    const user = await User.findOne({ phone }).populate('firstBuyPromo');
    console.log(user);
    if (user && !user?.firstBuyPromo && !user?.canFirstBuyPromo) {
      throw createError(400, 'First promo has alredy used');
    }
    const response = {};
    if (!user) {
      const promocode = await s.createFirstBuyPromocode({
        discount: 10,
        userPhone: phone,
      });
      const newUser = await User.create({
        phone,
        firstBuyPromo: promocode._id,
      });
      response.promocode = promocode.code;
      response.phone = newUser.phone;
    } else if (user.firstBuyPromo) {
      response.promocode = user.firstBuyPromo.code;
      response.phone = user.phone;
    }

    res.json(response);
  } catch (error) {
    next(error);
  }
};

const getPromocodeDiscount = async (req, res, next) => {
  try {
    const { code } = req.params;
    const discount = await s.getPromocodeDiscount(code);
    res.json({
      discount,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPromocodeList,
  createFirstOrderPromocode,
  getPromocodeDiscount,
};
