const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  promocode: {
    type: String,
    default: '',
  },
});

module.exports.Order = model('order', orderSchema);
