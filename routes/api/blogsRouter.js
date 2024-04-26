const { createRouter } = require('../../helpers');
const { blogsControllers: c } = require('../../controllers');
const { isValidId } = require('../../middlewares');

const blogsRouter = createRouter({
  //   `defaultMiddlewares: null,`
  options: [
    {
      method: 'get',
      route: '/',
      middlewares: null,
      controller: c.getBlogs,
    },
    {
      method: 'get',
      route: '/:id',
      middlewares: [isValidId],
      controller: c.getOneBlog,
    },
    {
      method: 'post',
      route: '/',
      middlewares: null,
      controller: c.addBlog,
    },
    {
      method: 'patch',
      route: '/:id',
      middlewares: [isValidId],
      controller: c.updateBlog,
    },
    {
      method: 'delete',
      route: '/:id',
      middlewares: [isValidId],
      controller: c.deleteBlog,
    },
  ],
});

blogsRouter.setRouter();

module.exports.blogsRouter = blogsRouter.router;
