const express = require('express');
const { promocodeRouter } = require('./routes/api/promocodeRouter');
const { userRouter } = require('./routes/api/userRouter');

const app = express();

app.use(express.json());

app.use('/api/promo', promocodeRouter);
app.use('/api/user', userRouter);

app.use((_, res, __) => {
  res.status(404).json({ message: 'Invalid route' });
});

app.use((err, _, res, __) => {
  const { message, status = 500 } = err;

  res.status(status).json(message);
});

module.exports = app;
