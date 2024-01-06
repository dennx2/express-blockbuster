const mongoose = require('mongoose');
const logger = require('../utils/logger');
const config = require('config');

module.exports = function () {
  // Run the server
  // mongod --dbpath="d:\data\db1" --replSet rs0
  // Connect with Client
  // mongosh mongodb://127.0.0.1:27017?replicaSet=rs0

  const db = config.get('db');
  mongoose
    .connect(
      db,
      { family: 4 } // Force IPv4
    )
    .then(() => logger.info(`Connected to ${db}...`));
};
