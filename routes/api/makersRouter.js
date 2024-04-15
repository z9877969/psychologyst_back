const { createRouter } = require('../../helpers');
const { makerControllers: c } = require('../../controllers');

const makerRouter = createRouter({
  //   `defaultMiddlewares: null,`
  options: [
    {
      method: 'get',
      route: '/',
      middlewares: null,
      controller: c.getMakers,
    },
  ],
});

makerRouter.setRouter();

module.exports.makerRouter = makerRouter.router;
