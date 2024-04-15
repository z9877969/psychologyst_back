const { createError } = require('../helpers');
const { Product } = require('../models');

// Припустимо, що вам потрібно оновити кількість товару для варіанту з _id = variantId
const variantId = 'тут_id_варіанту_який_потрібно_оновити';
const newQuantity = 60; // Нова кількість товару для оновлення

const updateProduct = async ({ productId, variantType, variantValue }) => {
  const product = await Product.updateOne(
    { 'variants._id': variantId }, // Фільтр для вибору варіанту за його _id
    { $set: { 'variants.$.quantity': newQuantity } }, // Оновлення кількості для варіанту зі вказаним _id
    (err, result) => {
      if (err) {
        console.error('Помилка під час оновлення:', err);
      } else {
        console.log('Успішно оновлено:', result);
      }
    }
  );

  if (!product) {
    throw createError(404, 'Product not found');
  }
};
