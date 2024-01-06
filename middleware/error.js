const logger = require('../utils/logger');

module.exports = function (err, req, res, next) {
  logger.error(err.message, err);

  // error
  // warn
  // info
  // http
  // verbose
  // debug
  // silly

  res.status(500).send('Something failed.');
};
