const { createRouter } = require('../../helpers');
const { promocodeControllers: c } = require('../../controllers');
const { validateBody } = require('../../helpers/validateBody');
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
  ],
});

promocodeRouter.setRouter();

module.exports.promocodeRouter = promocodeRouter.router;
