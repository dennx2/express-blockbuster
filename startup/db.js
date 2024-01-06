const mongoose = require('mongoose');
const logger = require('../utils/logger');

module.exports = function () {
  // Run the server
  // mongod --dbpath="d:\data\db1" --replSet rs0
  // Connect with Client
  // mongosh mongodb://127.0.0.1:27017?replicaSet=rs0

  mongoose
    .connect(
      'mongodb://127.0.0.1:27017/streaming?replicaSet=rs0',
      { family: 4 } // Force IPv4
    )
    .then(() => logger.info('Connected to MongoDB...'));
};
