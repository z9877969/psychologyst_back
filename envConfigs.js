require('dotenv').config();

module.exports = {
  PORT: process.env.PORT,
  DB_HOST: process.env.DB_HOST,
  MONOBANK_TOKEN: process.env.MONOBANK_TOKEN,
  TG_BOT_TOKEN: process.env.TG_BOT_TOKEN,
  TG_CHAT_ID: process.env.TG_CHAT_ID,
};
