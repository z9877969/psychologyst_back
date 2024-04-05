const mongoose = require('mongoose');
const app = require('./app');
const { DB_HOST, PORT } = require('./envConfigs');

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('DB connection successful');
    app.listen(PORT, () => {
      console.log('Server run. PORT:', PORT);
    });
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(-1);
  });
