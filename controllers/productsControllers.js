const fs = require('fs/promises');
const { createError } = require('../helpers');
const { Product, Variant } = require('../models');
const path = require('path');

const getAllProducts = async (_, res, next) => {
  try {
    const products = await Product.find({})
      .populate('category')
      .populate('maker')
      .populate('variants');
    res.json(products);
  } catch (error) {
    next(error);
  }
};

const addProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

const addProductVariant = async (req, res, next) => {
  try {
    const { body, params } = req;
    const { id } = params;
    const product = Product.findById(id);
    if (!product) {
      throw createError(404, 'Product not found');
    }
    const variant = await Variant.create(body);
    const updatedProduct = await Product.findByIdAndUpdate(id, {
      $push: { variants: variant._id },
    });
    res.status(201).json({ variant, productId: updatedProduct._id });
  } catch (error) {
    next(error);
  }
};

const updateProductVariant = async (req, res, next) => {
  try {
    const { body, params } = req;
    const { prodId, varId } = params;
    const product = Product.findById(prodId);
    if (!product) {
      throw createError(404, 'Product not found');
    }
    const variant = await Variant.findByIdAndUpdate(varId, body, { new: true });
    res.status(201).json(variant);
  } catch (error) {
    next(error);
  }
};

const updateVariantImages = async (req, res, next) => {
  try {
    const { files } = req;
    if (!files.length) {
      throw createError(400, 'Files not transferred');
    }
    const filenames = files.map((el) => el.filename);
    // ===
    const promises = filenames.map(async (el) => {
      try {
        await fs.rename(
          path.resolve('temp', el),
          path.resolve('public/images', el)
        );
        return path.join('/images', el);
      } catch (error) {
        throw error;
      } finally {
        // fs.unlink(path.resolve('temp', el));
      }
    });
    const promiseData = await Promise.allSettled(promises);
    const newPathes = promiseData.map(({ value }) => value);

    // ===
    const { varId } = req.params;
    const variant = await Variant.findByIdAndUpdate(varId, {
      $push: {
        images: { $each: newPathes },
      },
    });
    if (!variant) {
      throw createError(404, 'Variant not found');
    }
    res.json(variant);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  addProductVariant,
  updateProductVariant,
  updateVariantImages,
};
