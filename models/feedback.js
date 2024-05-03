const { Schema, model } = require('mongoose');

const feedbackSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports.Feedback = model('feedback', feedbackSchema);
