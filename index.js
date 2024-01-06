require('dotenv').config();
const config = require('config');

require('express-async-errors');

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();

require('./startup/routes')(app);
require('./startup/db')();

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERRPR: jwtPrivateKey is not defined.');
  process.exit(1);
}







const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}...`));
