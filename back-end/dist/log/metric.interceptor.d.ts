import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { MetricService } from './metric.service';
export declare class MetricInterceptor implements NestInterceptor {
    private readonly metricService;
    constructor(metricService: MetricService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
