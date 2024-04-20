
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
// устанавливаем порт сервера
const PORT = 5000;
const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));
try {
  app.use('/api/users', require('./routes/User'));

  app.listen(PORT, () => {
    console.log(`Сервер начал работать по http://localhost:${PORT}`);
  })
} catch (error) {
  console.warn(error);
}
