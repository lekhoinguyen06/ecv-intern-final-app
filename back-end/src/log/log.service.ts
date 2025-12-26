import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import WinstonCloudWatch from 'winston-cloudwatch';

@Injectable()
export class LogService {
  private consoleLogger: winston.Logger;
  private cloudWatchLogger: winston.Logger;

  constructor() {
    this.consoleLogger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors(),
        winston.format.colorize(),
        winston.format.simple(),
        // winston.format.json(),
      ),
    });
    this.cloudWatchLogger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors(),
        winston.format.colorize(),
        winston.format.simple(),
        // winston.format.json(),
      ),
      transports: [
        new winston.transports.Console(),
        new WinstonCloudWatch({
          logGroupName: 'ecv-intern-log-group',
          logStreamName: 'ecv-intern-log-stream',
          awsRegion: 'ap-southeast-1',
        }),
      ],
    });
  }

  info(info: string) {
    this.consoleLogger.info(info);
  }

  warn(warn: string) {
    this.consoleLogger.warn(warn);
  }

  error(message: string, error?: Error, context?: object) {
    this.cloudWatchLogger.error(message, { error, context });
  }
}
