const { createRouter } = require('../../helpers');
const { pagesControllers: c } = require('../../controllers');
const { isValidId, authenticate } = require('../../middlewares');

const pagesRouter = createRouter({
  //   `defaultMiddlewares: null,
  options: [
    {
      method: 'get',
      route: '/',
      middlewares: null,
      controller: c.getPages,
    },
    {
      method: 'post',
      route: '/',
      middlewares: [authenticate],
      controller: c.addPage,
    },
    {
      method: 'patch',
      route: '/:id',
      middlewares: [isValidId, authenticate],
      controller: c.updatePage,
    },
    {
      method: 'delete',
      route: '/:id',
      middlewares: [isValidId, authenticate],
      controller: c.deletePage,
    },
  ],
});

pagesRouter.setRouter();

module.exports.pagesRouter = pagesRouter.router;
