require('dotenv').config();
const config = require('config');

require('express-async-errors');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();

require('./startup/routes')(app);

if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERRPR: jwtPrivateKey is not defined.');
  process.exit(1);
}

// Run the server
// mongod --dbpath="d:\data\db1" --replSet rs0
// Connect with Client
// mongosh mongodb://127.0.0.1:27017?replicaSet=rs0

mongoose
  .connect(
    'mongodb://127.0.0.1:27017/streaming?replicaSet=rs0',
    { family: 4 } // Force IPv4
  )
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.log('Could not connect to MongoDB...', err));





const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}...`));
