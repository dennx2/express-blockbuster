const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  level: 'info',

  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' }),
    new transports.Console({ format: format.simple() })
  ],
  exceptionHandlers: [
    new transports.File({ filename: 'logs/exceptions.log' }),
    new transports.Console()
  ],
  rejectionHandlers: [
    new transports.File({ filename: 'logs/rejections.log' }),
    new transports.Console()
  ]
});

module.exports = logger;
