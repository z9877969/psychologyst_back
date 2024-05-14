const { Schema, model } = require('mongoose');

const pageSchema = new Schema(
  {
    headerSection: {
      factPhone: String,
      displayingPhone: String,
    },
    heroSection: {
      title: String,
      descr: String,
    },
    videoSection: {
      title: String,
      videoUrl: String,
    },
    aboutSection: {
      title: String,
      accent: {
        type: String,
        default: null,
      },
      descr: String
    },
    sertificateSection: {
      title: String,
      descr: String,
      list: Array,
    },
    quote1Section: {},
    myHelpSection: {
      list: Array,
    },
    problemSection: {},
    reserveSection: {},
    quote2Section: {},
    blogSection: {},
    fAQSection: {},
    footerSection: {},
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports.Page = model('page', pageSchema);
