const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const { ordersRouter } = require('./routes/api/ordersRouter');
const { blogsRouter } = require('./routes/api/blogsRouter');
const { feedbackRouter } = require('./routes/api/feedbackRouter');
const { pagesRouter } = require('./routes/api/pagesRouter');
const { userRouter } = require('./routes/api/userRouter');

const app = express();
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());


app.use('/api/orders', ordersRouter);
app.use('/api/blogs', blogsRouter);
app.use('/api/feedbacks', feedbackRouter);
app.use('/api/pages', pagesRouter);
app.use('/api/users', userRouter);

app.use((_, res, __) => {
  res.status(404).json({ message: 'Invalid route' });
});

app.use((err, _, res, __) => {
  const { message, status = 500 } = err;

  res.status(status).json(message);
});

module.exports = app;
