const voucherCodes = require('voucher-code-generator');

module.exports.generateOrderNum = () => {
  const suffixList = voucherCodes.generate({
    count: 1,
    length: 3,
    charset: 'ABCDEFGHIJKLMNPQRSTUVWXYZ',
  });
  return Math.ceil(Date.now() / 1000) + '_' + suffixList[0];
};
