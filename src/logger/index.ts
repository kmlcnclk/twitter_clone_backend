import { format, createLogger, transports } from 'winston';
import dayjs from 'dayjs';
import _ from 'lodash';

const tsFormat = () => dayjs().format('DD/MM/YYYY HH:mm:ss');

const customFormat = format.combine(
  format.timestamp({ format: tsFormat }),
  format.colorize(),
  format.printf((info: any) => {
    return `[${info.timestamp}] - [${info.level}]: ${info.message}`;
  })
);

const logger = createLogger({
  level: 'info',
  format: customFormat,
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'warn.log', level: 'warn' }),
    new transports.File({ filename: 'info.log', level: 'info' }),
    new transports.Console({ format: customFormat }),
  ],
});

export default logger;
