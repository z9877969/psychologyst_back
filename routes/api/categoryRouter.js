const { createRouter } = require('../../helpers');
const { categoryControllers: c } = require('../../controllers');
const { authenticate } = require('../../middlewares');

const categoryRouter = createRouter({
  //   `defaultMiddlewares: null,
  options: [
    {
      method: 'get',
      route: '/',
      middlewares: [authenticate],
      controller: c.createOrder,
    },
  ],
});

categoryRouter.setRouter();

module.exports.categoryRouter = categoryRouter.router;
