import { Injectable, OnModuleInit } from '@nestjs/common';
import { LogService } from './log.service';

@Injectable()
export class MetricService implements OnModuleInit {
  private metrics: Record<string, number> = {};
  private readonly INTERVAL_MS = 5 * 60 * 1000; // 5 minutes

  constructor(private readonly logService: LogService) {}

  onModuleInit() {
    this.startScheduler();
  }

  track(statusCode: number) {
    const key = statusCode.toString();
    this.metrics[key] = (this.metrics[key] ?? 0) + 1;
  }

  private startScheduler() {
    setInterval(() => {
      this.logAndReset();
    }, this.INTERVAL_MS);
  }

  private logAndReset() {
    const totalRequests = Object.values(this.metrics).reduce(
      (a, b) => a + b,
      0,
    );

    if (totalRequests > 0) {
      const payload = {
        period: '5m',
        timestamp: new Date().toISOString(),
        totalRequests,
        statusCodeBreakdown: { ...this.metrics },
      };

      this.logService.metric(payload.timestamp, payload);
    }

    this.metrics = {};
  }
}
