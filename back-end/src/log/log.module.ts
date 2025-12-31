import { Module } from '@nestjs/common';
import { LogService } from './log.service';
import { MetricService } from './metric.service';
import { MetricInterceptor } from './metric.interceptor';
@Module({
  providers: [LogService, MetricService, MetricInterceptor],
  exports: [LogService, MetricService, MetricInterceptor],
})
export class LogModule {}
