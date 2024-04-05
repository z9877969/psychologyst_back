const axios = require('axios');
const {monobank: mono} = require('../constants');



const getPaymentData = ({
  orderId,
  orderTotalPrice,
  productsTotalAmount,
  productsList,
  ccy,
}) => ({
  order_ref: orderId, // x ID замовлення або ID корзини замовлення, який формується мерчантом
  amount: orderTotalPrice, // x Загальна сума замовлення
  ccy, // Цифровий ISO-код валюти (за замовчуванням 980 - грн.)

  count: productsTotalAmount, // x Кількість товарів у чеку
  products: productsList, // Масив товарів у замовленні, кожен товар має наступні параметри
  /* 
name: curProductName, // x Назва товару
code_product: curProdoctCode, // Код товару
code_checkbox, // Код товару (checkbox), якщо є підключення
cnt: curProductCount // x Кількість конкретної назви товару
price: curProductPriceTotal // x Вартість товару
*/
  // Масив доступних способів доставки для замовлення
  dlv_method_list: [mono.DELIVERY_METHOD_LIST.NP],
  // dlv_pay_merchant: true, // Флаг оплати доставки магазином (за замовчуванням - оплачує клієнт)
  // Масив доступних способів оплати для замовлення
  payment_method_list: [
    mono.PAYMENT_METHOD_LIST.CARD,
    mono.PAYMENT_METHOD_LIST.PAYMENT_ON_DELIVERY,
  ],
  callback_url: 'http://localhost:3023/api/mono/response', // урл, куди буде повертатись інформація по замовленню

  return_url: 'https://brush-buddy.netlify.app', // урл, куди буде повертатись клієнт - після замовлення
});

/* 
response example:
{
  "result":{
  "redirect_url":"https://checkout.mono.t3zt.com/resource/order/6f36e458-98ad-474c-bc67-aa56bb60ad64",
  "order_id":"6f36e458-98ad-474c-bc67-aa56bb60ad64"
  }
} 
*/

const sendPayment = async ({
  orderId,
  orderTotalPrice,
  productsTotalAmount,
  productsList,
  ccy = 980,
}) => {
  try {
    const data = getPaymentData({
      orderId,
      orderTotalPrice,
      productsTotalAmount,
      productsList,
      ccy,
    });

    console.log(data);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendPayment,
};
