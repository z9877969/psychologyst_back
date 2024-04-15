const { createRouter, validateBody, validateParams } = require('../../helpers');
const { productsControllers: c } = require('../../controllers');
const {
  productsSchemas: { productAddingSchema },
} = require('../../schemas');
const { isValidId, upload } = require('../../middlewares');

const productsRouter = createRouter({
  //   `defaultMiddlewares: null,`
  options: [
    {
      method: 'get',
      route: '/',
      middlewares: null,
      controller: c.getAllProducts,
    },
    {
      method: 'post',
      route: '/',
      middlewares: [validateBody(productAddingSchema)],
      controller: c.addProduct,
    },
    {
      method: 'post',
      route: '/:id',
      middlewares: [isValidId],
      controller: c.addProductVariant,
    },
    {
      method: 'post',
      route: '/images/:varId',
      middlewares: [isValidId, upload.variantImages.array('images', 8)],
      controller: c.updateVariantImages,
      // controller: (req, res) => {
      //   console.log('files :>> ', req.files);
      //   res.json('updateVariantImages is OK');
      // },
    },
  ],
});

productsRouter.setRouter();

module.exports.productsRouter = productsRouter.router;
