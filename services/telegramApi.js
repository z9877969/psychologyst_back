const axios = require('axios');
const { TG_BOT_TOKEN, TG_CHAT_ID } = require('../envConfigs');

const instance = axios.create({
  baseURL: `https://api.telegram.org/bot${TG_BOT_TOKEN}`,
});

const sendMessageTg = async (orderData) => {
  const orderNum = Math.ceil(Date.now() / 1000);
  orderData.orderNum = orderNum;
  const { data } = await instance.post('/sendMessage', {
    chat_id: TG_CHAT_ID,
    parse_mode: 'html',
    text: createTgMessage(orderData),
  });

  return { ...data, orderNum };
};

module.exports = {
  sendMessageTg,
};
