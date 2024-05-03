const { createRouter } = require('../../helpers');
const { userControllers: c } = require('../../controllers');
const authenticate = require('../../middlewares/authenticate');

const authRouter = createRouter({
  //   `defaultMiddlewares: null,
  options: [
    {
      method: 'post',
      route: '/register',
      middlewares: null,
      controller: c.registerUser,
    },
    {
      method: 'post',
      route: '/login',
      middlewares: null,
      controller: c.loginUser,
    },
    {
      method: 'post',
      route: '/logout',
      middlewares: [authenticate],
      controller: c.logoutUser,
    },
    {
      method: 'get',
      route: '/current',
      middlewares: [authenticate],
      controller: c.getCurUser,
    },
  ],
});

authRouter.setRouter();

module.exports.authRouter = authRouter.router;
