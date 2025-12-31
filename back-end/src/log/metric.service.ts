// Store API call rates
// Format:  .json
// Period: daily
import { Injectable } from '@nestjs/common';
import { LogService } from './log.service';

@Injectable()
export class MetricService {
  constructor(private readonly logService: LogService) {}

  trackRequest() {
    this.logService.metric({
      type: 'request_count',
      timestamp: new Date().toISOString(),
    });
  }
}
