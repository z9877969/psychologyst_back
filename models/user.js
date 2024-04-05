const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    phone: {
      type: String,
      required: [true, 'Phone is required'],
    },
    firstBuyPromo: {
      type: Schema.Types.ObjectId,
      ref: 'promocode',
      default: null,
      required: false,
    },
    canFirstBuyPromo: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports.User = model('user', userSchema);
