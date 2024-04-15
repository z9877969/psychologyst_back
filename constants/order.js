const PAYMENT_METHOD = {
  CASH: 'cash', // payment on delivery
  CARD: 'card', // payment by card
};

const PAYMENT_STATUS = {
  SUCCESS: 'success',
  PROCESSING: 'processing',
};

const REGEX = {
  PHONE: /^\+(380)(\d{9})$/,
  NAME: /^[a-яА-ЯєЄїЇьЬҐґйЙіІ]{2,18}[\s]{1,2}[a-яА-ЯєЄїЇьЬҐґйЙіІ]{2,18}[\s]{1,2}[a-яА-ЯєЄїЇьЬҐґйЙіІ]{6,24}$/,
};

module.exports = {
  PAYMENT_METHOD,
  PAYMENT_STATUS,
  REGEX,
};
