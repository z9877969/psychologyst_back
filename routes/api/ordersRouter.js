const { createRouter } = require('../../helpers');
const { orderControllers: c } = require('../../controllers');

const ordersRouter = createRouter({
  //   `defaultMiddlewares: null,`
  options: [
    {
      method: 'post',
      route: '/',
      middlewares: null,
      controller: c.createOrder,
    },
    {
      method: 'post',
      route: '/:orderId/acquiring/webhook',
      middlewares: null,
      controller: c.checkOrderPayment,
    },
  ],
});

ordersRouter.setRouter();

module.exports.ordersRouter = ordersRouter.router;
