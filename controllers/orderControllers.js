const { telegramApi: tgApi } = require('../services');

const createOrder = async (req, res, next) => {
  try {
    const { message } = req.body;
    tgApi.sendMessageTg(message);
    res.status(200).json({message: 'Success operation'})
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
};
