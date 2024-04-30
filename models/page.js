const { Schema, model } = require('mongoose');

const pageSchema = new Schema(
  {
    sections: {
      type: Array,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports.Page = model('page', pageSchema);