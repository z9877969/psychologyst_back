const multer = require('multer');
const path = require('path');
const voucherCodes = require('voucher-code-generator');

const tempDirPath = path.resolve('temp', './');

const generateFileNameSufix = () => {
  const suffixList = voucherCodes.generate({
    count: 1,
    length: 6,
    charset: '0123456789abcdefghijklmnopqrstuvwxyz',
  });
  return suffixList[0];
};

const storageVariantImages = multer.diskStorage({
  destination: tempDirPath,
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const filename = path.format({
      name: req.params.varId + '_' + generateFileNameSufix(),
      ext,
    });
    cb(null, filename);
  },
});

const variantImages = multer({ storage: storageVariantImages });

module.exports = {
  variantImages,
};
