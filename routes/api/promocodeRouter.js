const { createRouter } = require('../../helpers');
const { promocodeControllers: c } = require('../../controllers');
const { validateBody, validateParams } = require('../../helpers');
const { promocodeSchemas: schema } = require('../../schemas');

const promocodeRouter = createRouter({
  //   `defaultMiddlewares: null,`
  options: [
    {
      method: 'post',
      route: '/',
      middlewares: null,
      controller: c.createPromocode,
    },
    {
      method: 'post',
      route: '/first',
      middlewares: [validateBody(schema.firstOrderValidating)],
      controller: c.createFirstOrderPromocode,
    },
    {
      method: 'get',
      route: '/:code/discount',
      middlewares: [validateParams(schema.promocodeDiscountValidating)],
      controller: c.getPromocodeDiscount,
    },
  ],
});

promocodeRouter.setRouter();

module.exports.promocodeRouter = promocodeRouter.router;
