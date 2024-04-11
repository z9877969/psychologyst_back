const express = require('express');
const cors = require('cors');
const { promocodeRouter } = require('./routes/api/promocodeRouter');
const { userRouter } = require('./routes/api/userRouter');
const { oredrRouter } = require('./routes/api/orderRouter');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/promo', promocodeRouter);
app.use('/api/user', userRouter);
app.use('/api/order', oredrRouter);

app.use((_, res, __) => {
  res.status(404).json({ message: 'Invalid route' });
});

app.use((err, _, res, __) => {
  const { message, status = 500 } = err;

  res.status(status).json(message);
});

module.exports = app;
