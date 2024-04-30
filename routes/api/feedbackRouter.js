const { createRouter } = require('../../helpers');
const { feedbacksControllers: c } = require('../../controllers');
const { isValidId, authenticate } = require('../../middlewares');

const feedbackRouter = createRouter({
  //   `defaultMiddlewares: null,
  options: [
    {
      method: 'get',
      route: '/',
      middlewares: [authenticate],
      controller: c.getFeedbacks,
    },
    {
      method: 'get',
      route: '/visible',
      middlewares: null,
      controller: c.getVisibleFeedbacks,
    },
    {
      method: 'post',
      route: '/',
      middlewares: null,
      controller: c.addFeedback,
    },
    {
      method: 'patch',
      route: '/:id',
      middlewares: [isValidId, authenticate],
      controller: c.updateFeedbackShowing,
    },
    {
      method: 'delete',
      route: '/:id',
      middlewares: [isValidId, authenticate],
      controller: c.deleteFeedback,
    },
  ],
});

feedbackRouter.setRouter();

module.exports.feedbackRouter = feedbackRouter.router;
