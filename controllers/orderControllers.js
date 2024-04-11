const path = require('path');
const { order } = require('../constants');
const { PAYMENT_STATUS } = require('../constants/order');
const { FRONTEND_URL } = require('../envConfigs');
const { createError } = require('../helpers');
const { Order, Promocode } = require('../models');
const { monobankApi: mbApi } = require('../services');
const { telegramApi: tgApi } = require('../services');

/* 
order schema:
  {
      products: [
        {
          title: 'Product title',
          color: 'Product color',
          flavor: 'Product flavor',
          volume: 'Product volume',
          amount: 'Product amount',
          price: 150 // 'Product price',
          salePrice: 122 // 'Product salePrice',
        },
      ],
      orderSum: 500, // order total sum
      promocode: 'Xh5jhGO2',
      discount: 10,
      discountedOrerSum: 0, // sum of order with sale
      delivery: {
        phone: 'User phone',
        name: 'User full name',
        city: 'delivery city',
        postOffice: 'delivery post office',
        comments: 'some user comment',
      },
      paymentMethod: 'cash', // ['card', 'cash']
    }
*/

const createOrder = async (req, res, next) => {
  try {
    const { paymentMethod, delivery, promocode } = req.body;
    if (promocode) {
      const promo = await Promocode.findOne({ code: promocode });
      // validate first buy promocode
      if (promo.phone && promo.phone !== delivery.phone) {
        throw createError(403, 'Cann`t use promocode with this phone');
      }
    }
    // в orderData покласти всі поля з body
    const orderData = {
      products: [
        {
          title: 'Product title',
          color: 'Product color',
          flavor: 'Product flavor',
          volume: 'Product volume',
          amount: 'Product amount',
          price: 'Product price',
          salePrice: 'Product salePrice',
        },
      ],
      totalPrice: 500, // order total sum
      promocode: 'Xh5jhGO2',
      discount: 10,
      delivery: {
        phone: 'User phone',
        name: 'User full name',
        city: 'delivery city',
        postOffice: 'delivery post office',
        comments: 'some user comment',
      },
      paymentMethod: 'cash', // ['card', 'cash']
    };
    const newOrder = await Order.create(orderData);

    switch (paymentMethod) {
      case order.PAYMENT_METHOD.CARD:
        const paymentPageUrl = await mbApi.sendPayment({
          amount:
            newOrder.discount > 0
              ? newOrder.discountedOrerSum
              : newOrder.orderSum,
          orderNum: newOrder.orderNum,
        });
        res.json({ paymentPageUrl });
        break;
      case order.PAYMENT_METHOD.CASH:
        // 1. send order message to TG
        await tgApi.sendMessageTg(orderData);
        // 2. response order num
        res.json({ orderNum });
      default:
        break;
    }
  } catch (error) {
    next(error);
  }
};

const checkOrderPayment = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { status, modifiedDate } = req.body;
    if (status === PAYMENT_STATUS.SUCCESS) {
      const order = await Order.findByIdAndUpdate(orderId, {
        paymentStatus: PAYMENT_STATUS.SUCCESS,
      });
      const redirectUrl = path.join(FRONTEND_URL, 'order/thank', orderNum);
      res.redirect(redirectUrl);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  checkOrderPayment,
};
