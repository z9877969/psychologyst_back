const { Schema, model } = require('mongoose');

const promocodeSchema = new Schema(
  {
    userPhone: {
      type: String,
      default: '',
    },
    code: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    dedline: {
      type: String,
      default: '',
    },
    isFirstBuyPromo: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports.Promocode = model('promocode', promocodeSchema);
