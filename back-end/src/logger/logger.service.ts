import { Injectable, Scope } from '@nestjs/common';
import * as winston from 'winston';
import CloudWatchTransport from 'winston-aws-cloudwatch';

// Transient scope create unique logger instance for each consuming feature modules
@Injectable({ scope: Scope.TRANSIENT })
export class LoggingService {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      transports: [
        new CloudWatchTransport({
          logGroupName: 'ecv-intern-log-group', // REQUIRED
          logStreamName: 'ecv-intern-log-stream', // REQUIRED
          createLogGroup: true,
          createLogStream: true,
          submissionInterval: 2000,
          submissionRetryCount: 1,
          batchSize: 20,
          // awsConfig: {
          //   accessKeyId: '...',
          //   secretAccessKey: '...',
          //   region: '...',
          // },
          formatLog: (item: any) => `Winston log: ${JSON.stringify(item)}`,
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
