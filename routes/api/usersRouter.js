const { createRouter } = require('../../helpers');
const { userControllers: c } = require('../../controllers');

const usersRouter = createRouter({
  //   `defaultMiddlewares: null,`
  options: [
    {
      method: 'get',
      route: '/',
      middlewares: null,
      controller: c.getUsers,
    },
    {
      method: 'patch',
      route: '/',
      middlewares: null,
      controller: c.getFirstBuyDiscount,
    },
  ],
});

usersRouter.setRouter();

module.exports.usersRouter = usersRouter.router;
