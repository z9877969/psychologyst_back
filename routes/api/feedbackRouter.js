const { createRouter } = require('../../helpers');
const { feedbacksControllers: c } = require('../../controllers');
const { isValidId } = require('../../middlewares');

const feedbackRouter = createRouter({
  //   `defaultMiddlewares: null,
  options: [
    {
      method: 'get',
      route: '/',
      middlewares: null,
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
      middlewares: [isValidId],
      controller: c.updateFeedbackShowing,
    },
    {
      method: 'delete',
      route: '/:id',
      middlewares: [isValidId],
      controller: c.deleteFeedback,
    },
  ],
});

feedbackRouter.setRouter();

module.exports.feedbackRouter = feedbackRouter.router;
