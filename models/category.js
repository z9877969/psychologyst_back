const { Schema, model } = require('mongoose');

const categorySchema = new Schema(
  {},
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports.Category = model('category', categorySchema);
