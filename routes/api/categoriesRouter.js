const { createRouter } = require('../../helpers');
const { categoryControllers: c } = require('../../controllers');

const categoryRouter = createRouter({
  //   `defaultMiddlewares: null,`
  options: [
    {
      method: 'get',
      route: '/',
      middlewares: null,
      controller: c.getCategories,
    },
  ],
});

categoryRouter.setRouter();

module.exports.categoryRouter = categoryRouter.router;
