import tracer from 'dd-trace';
import winston from 'winston';

tracer.init({
  service: 'service1',
  env: process.env.DD_ENV,
  hostname: 'localhost',
  port: 4000,
  logInjection: true,
}); // initialized in a different file to avoid hoisting.

console.log('Datadog tracer installed');

// console.log(winston);

const loggerInfo = winston.createLogger({
  level: 'info',
  exitOnError: false,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [new winston.transports.Console()],
});

const loggerWarn = winston.createLogger({
  level: 'warn',
  exitOnError: false,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [new winston.transports.Console()],
});

const loggerError = winston.createLogger({
  level: 'error',
  exitOnError: false,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [new winston.transports.Console()],
});

loggerInfo.info('Logger Initialized');

export { tracer, loggerInfo, loggerWarn, loggerError };
