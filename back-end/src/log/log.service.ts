import { Injectable } from '@nestjs/common';
import * as winston from 'winston';
import WinstonCloudWatch from 'winston-cloudwatch';

@Injectable()
export class LogService {
  private consoleLogger: winston.Logger;
  private cloudWatchLogger: winston.Logger;
  private metricLogger: winston.Logger;

  constructor() {
    this.consoleLogger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors(),
        winston.format.colorize(),
      ),
      transports: [new winston.transports.Console()],
    });
    this.cloudWatchLogger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors(),
        winston.format.colorize(),
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
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors(),
        winston.format.colorize(),
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
    this.consoleLogger.silly(silly);
  }

  info(info: string) {
    this.consoleLogger.info(info);
  }

  warn(warn: string) {
    this.cloudWatchLogger.warn(warn);
  }

  crit(crit: string) {
    this.cloudWatchLogger.crit(crit);
  }

  error(message: string, error?: Error, context?: object) {
    this.cloudWatchLogger.error(message, { error, context });
  }
}
