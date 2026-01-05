import { Injectable, OnModuleInit } from '@nestjs/common';
import { LogService } from './log.service';

@Injectable()
export class MetricService implements OnModuleInit {
  private metrics: Record<string, number> = {};

  constructor(private readonly logService: LogService) {}

  onModuleInit() {
    this.scheduleDailyLog();
  }

  track(statusCode: number) {
    const key = statusCode.toString();
    if (!this.metrics[key]) {
      this.metrics[key] = 0;
    }
    this.metrics[key]++;
  }

  private scheduleDailyLog() {
    const now = new Date();
    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
      0,
      0,
      0,
    );
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    setTimeout(() => {
      this.logAndReset();
      setInterval(
        () => {
          this.logAndReset();
        },
        24 * 60 * 60 * 1000,
      );
    }, timeUntilMidnight);
  }

  private logAndReset() {
    const totalRequests = Object.values(this.metrics).reduce(
      (a, b) => a + b,
      0,
    );

    if (totalRequests > 0) {
      const payload = {
        period: 'daily',
        timestamp: new Date().toISOString(),
        totalRequests,
        statusCodeBreakdown: { ...this.metrics },
      };

      this.logService.metric(payload);
    }

    this.metrics = {};
  }
}
