const { createRouter, validateBody } = require('../../helpers');
const { filtersControllers: c } = require('../../controllers');

const filtersRouter = createRouter({
  //   `defaultMiddlewares: null,`
  options: [
    {
      method: 'get',
      route: '/categories',
      middlewares: null,
      controller: c.getCategories,
    },
    {
      method: 'get',
      route: '/',
      middlewares: null,
      controller: c.getFilters,
    },
  ],
});

filtersRouter.setRouter();

module.exports.filtersRouter = filtersRouter.router;
