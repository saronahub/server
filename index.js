const express = require('express');
const bodyParser = require('body-parser');

const initDB = require('./lib/initDB');
const logger = require('./lib/logger');
// const { router: api } = require('./routes');

initDB();

const app = express();

app.use(bodyParser.json());

// app.use('/', api);

process.on('exit', (code) => {
  logger.error(`process exited with error ${code}`);
});

