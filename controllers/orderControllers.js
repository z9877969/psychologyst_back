const { order } = require('../constants');
const { monobankApi: mbApi } = require('../services');

const createOrder = async (req, res, next) => {
  try {
    const {
      orderId,
      orderTotalPrice,
      productsTotalAmount,
      productsList,
      ccy,
      paymentMethod,
    } = req.body;

    if (paymentMethod === order.PAYMENT_METHOD.CARD) {
      await mbApi.sendPayment({
        orderId,
        orderTotalPrice,
        productsTotalAmount,
        productsList,
        ccy,
      });
      // await console.log(object);
      res.json('ORDER PAYED WITH CARD');
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
};
