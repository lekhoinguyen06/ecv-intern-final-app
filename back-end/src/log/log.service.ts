import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import WinstonCloudWatch from 'winston-cloudwatch';

@Injectable()
export class LogService {
  private sillyLogger: typeof console;
  private cloudWatchLogger: winston.Logger;
  private metricLogger: winston.Logger;

  constructor() {
    this.sillyLogger = console;

    this.cloudWatchLogger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
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

    this.metricLogger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json(),
      ),
      transports: [
        new winston.transports.Console(),
        new WinstonCloudWatch({
          logGroupName: 'ecv-intern-metrics-log-group',
          logStreamName: 'ecv-intern-metrics-log-stream',
          awsRegion: 'ap-southeast-1',
        }),
      ],
    });
  }

  metric(obj: object) {
    this.metricLogger.info(obj);
  }

  silly(silly: string) {
    this.sillyLogger.log(silly);
  }

  info(info: string) {
    this.cloudWatchLogger.info(info);
  }

  warn(warn: string) {
    this.cloudWatchLogger.warn(warn);
  }

  error(message: string, error?: Error, context?: object) {
    this.cloudWatchLogger.error(message, { error, context });
  }
}
