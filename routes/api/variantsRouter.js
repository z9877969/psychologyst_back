const { createRouter, validateBody } = require('../../helpers');
const { variantsControllers: c } = require('../../controllers');
const { isValidId, upload } = require('../../middlewares');

const variantsRouter = createRouter({
  //   `defaultMiddlewares: null,`
  options: [
    {
      method: 'get',
      route: '/:id',
      middlewares: [isValidId],
      controller: c.getVariantById,
    },
    {
      method: 'get',
      route: '/',
      middlewares: null,
      controller: (req, res, next) => {
        res.json('OK');
      },
    },
    {
      method: 'post',
      route: '/:prodId',
      middlewares: [isValidId],
      controller: c.addVariant,
    },
    {
      method: 'patch',
      route: '/:id',
      middlewares: [isValidId],
      controller: c.updateVariant,
    },
    {
      method: 'delete',
      route: '/:id',
      middlewares: [isValidId],
      controller: c.deleteVariant,
    },
    {
      method: 'post',
      route: '/images/:id',
      middlewares: [isValidId, upload.variantImages.array('images', 8)],
      controller: c.updateVariantImages,
      // controller: (req, res) => {
      //   console.log('files :>> ', req.files);
      //   res.json('updateVariantImages is OK');
      // },
    },
  ],
});

variantsRouter.setRouter();

module.exports.variantsRouter = variantsRouter.router;
