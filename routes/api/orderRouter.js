const { createRouter } = require('../../helpers');
const { monobankControllers: c } = require('../../controllers');

const oredrRouter = createRouter({
  //   `defaultMiddlewares: null,`
  options: [
    {
      method: 'post',
      route: '/',
      middlewares: null,
      controller: c.sendPayment,
    },
  ],
});

oredrRouter.setRouter();

module.exports.oredrRouter = oredrRouter.router;
