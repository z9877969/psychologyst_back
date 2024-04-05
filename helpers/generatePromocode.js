const randomstring = require('randomstring');

const generatePromoCode = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const code = randomstring.generate({
    length: length,
    charset: characters,
  });
  return code;
};

module.exports = {
  generatePromoCode,
};
