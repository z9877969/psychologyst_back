const { Schema, model } = require('mongoose');
const { generateOrderNum } = require('../helpers');

const orderSchema = new Schema(
  {
    orderNum: {
      type: String,
      required: true,
      default: generateOrderNum(),
    },
    products: [
      {
        title: {
          type: String,
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
        flavor: {
          type: String,
          required: true,
        },
        volume: {
          type: String,
          match: /^[1-9]{1}[0-9]{0,4}$/,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        }, // 'Product price',
        salePrice: {
          type: Number,
          required: true,
        }, // 'Product salePrice',
      },
    ],
    orderSum: {
      type: Number,
      required: true,
    }, // order total sum
    promocode: {
      type: String,
      required: false,
      default: null,
    }, // 'Xh5jhGO2',
    discount: {
      type: Number,
      required: false,
      default: 0,
    },
    discountedOrerSum: {
      type: Number,
      required: false,
      default: null,
    }, // sum of order with discount by promocode
    delivery: {
      phone: {
        type: String,
        required: true,
      }, //'User phone'
      name: {
        type: String,
        required: true,
      }, // 'User full name'
      city: {
        type: String,
        required: true,
      }, // 'delivery city'
      postOffice: {
        type: String,
        required: true,
      }, // 'delivery post office',
      comments: {
        type: String,
        required: false,
        default: 'No comment',
      }, // 'some user comment',
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'cash'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['success', 'processing'],
      required: false,
      default: 'processing',
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

orderSchema.pre('findByIdAndUpdate', function () {
  this.setOptions({ new: true }); // Встановлення опції new: true
});

module.exports.Order = model('order', orderSchema);
