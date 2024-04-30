const { createRouter } = require('../../helpers');
const { userControllers: c } = require('../../controllers');
const authenticate = require('../../middlewares/authenticate');

const userRouter = createRouter({
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
  ],
});

userRouter.setRouter();

module.exports.userRouter = userRouter.router;
