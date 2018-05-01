const http = require('http');
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');

const initDB = require('./lib/initDB');
const logger = require('./lib/logger');
// const { router: api } = require('./routes');

if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

initDB();

const app = express();

app.use(bodyParser.json());

// app.use('/', api);

http.createServer(app).listen(process.env.PORT || 3000);

process.on('exit', (code) => {
  logger.error(`process exited with error ${code}`);
});

