const http = require('http');
const dotenv = require('dotenv');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');

const initDB = require('./lib/initDB');
const logger = require('./lib/logger');
const { router: api } = require('./routes');

if (process.env.NODE_ENV !== 'production') {
  const result = dotenv.config();

  if (result.error) {
    process.exit(result.error);
  }
}

initDB();

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', api);

http.createServer(app).listen(process.env.PORT || 3000);

process.on('exit', (code) => {
  logger.error(`process exited with error ${code}`);
});
