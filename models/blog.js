const { Schema, model } = require('mongoose');

const blogSchema = new Schema(
  {
    items: {
      type: Array,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'category',
    },
    previewUrl: {
      type: String,
      default: '',
    },
    author: {
      author: {
        type: String,
        required: true,
      },
      date: {
        type: String,
        required: true,
      },
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports.Blog = model('blog', blogSchema);
