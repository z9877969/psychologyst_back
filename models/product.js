const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  variants: [
    {
      color: {
        type: String,
        default: null,
      },
      flavor: {
        type: String,
        default: null,
      },
      volume: {
        type: String,
        default: null,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports.Product = model('product', productSchema);
