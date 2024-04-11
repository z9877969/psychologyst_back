const { createRouter } = require('../../helpers');
const { orderControllers: c } = require('../../controllers');

const oredrRouter = createRouter({
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

oredrRouter.setRouter();

module.exports.oredrRouter = oredrRouter.router;
