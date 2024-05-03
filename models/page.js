const { Schema, model } = require('mongoose');

const pageSchema = new Schema(
  {
    videoSection: {
      videoUrl: String,
    },
    sertificateSection: {
      list: Array,
    },
    myHelpSection: {
      list: Array,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports.Page = model('page', pageSchema);
