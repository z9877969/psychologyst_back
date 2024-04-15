const { Schema, model } = require('mongoose');
const { WATERMARK } = require('../constants/products');

const variantSchema = new Schema(
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
    marker: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
      required: false,
      default: 0,
    },
    quantity: {
      type: Number,
      required: true,
    },
    watermark: {
      type: String,
      enum: [WATERMARK.WOW, WATERMARK.SALE],
      default: null,
    },
    images: {
      type: [String],
      required: false,
      default: [],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

variantSchema.pre('findOneAndUpdate', function () {
  this.setOptions({ new: true });
});

module.exports.Variant = model('variant', variantSchema);
