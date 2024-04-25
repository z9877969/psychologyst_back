const { Schema, model } = require('mongoose');

const blogSchema = new Schema(
  {
    items: {
      type: Array,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports.Blog = model('blog', blogSchema);
