const { createRouter } = require('../../helpers');
const { buyerControllers: c } = require('../../controllers');

const userRouter = createRouter({
  //   `defaultMiddlewares: null,`
  options: [
    {
      method: 'patch',
      route: '/',
      middlewares: null,
      controller: c.getFirstBuyDiscount,
    },
  ],
});

userRouter.setRouter();

module.exports.userRouter = userRouter.router;
