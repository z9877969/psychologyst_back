const { createRouter } = require('../../helpers');
const { blogsControllers: c } = require('../../controllers');
const { isValidId, authenticate } = require('../../middlewares');

const blogsRouter = createRouter({
  //   `defaultMiddlewares: null,
  options: [
    {
      method: 'get',
      route: '/',
      middlewares: null,
      controller: c.getBlogs,
    },
    {
      method: 'post',
      route: '/',
      middlewares: [authenticate],
      controller: c.addBlog,
    },
    {
      method: 'patch',
      route: '/:id',
      middlewares: [isValidId, authenticate],
      controller: c.updateBlog,
    },
    {
      method: 'delete',
      route: '/:id',
      middlewares: [isValidId, authenticate],
      controller: c.deleteBlog,
    },
  ],
});

blogsRouter.setRouter();

module.exports.blogsRouter = blogsRouter.router;
