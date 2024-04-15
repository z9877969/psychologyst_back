const { Schema, model } = require('mongoose');

const makerSchema = new Schema(
  {},
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports.Maker = model('maker', makerSchema);
