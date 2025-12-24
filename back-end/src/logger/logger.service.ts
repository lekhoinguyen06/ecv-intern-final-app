import { Injectable, Scope } from '@nestjs/common';
import * as winston from 'winston';
import WinstonCloudWatch from 'winston-cloudwatch';

// Transient scope create unique logger instance for each consuming feature modules
@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
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
    this.logger.info(info);
  }

  warn(warn: string) {
    this.logger.warn(warn);
  }

  error(error: string) {
    this.logger.error(error);
  }
}
