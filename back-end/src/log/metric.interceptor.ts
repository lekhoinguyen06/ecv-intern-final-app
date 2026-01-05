import {
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MetricService } from './metric.service';

@Injectable()
export class MetricInterceptor implements NestInterceptor {
  constructor(private readonly metricService: MetricService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      tap({
        next: () => {
          const ctx = context.switchToHttp();
          const response = ctx.getResponse<Response>();
          this.metricService.track(response.statusCode);
        },
        error: (err) => {
          if (err instanceof HttpException) {
            const status = err.getStatus() || 500;
            this.metricService.track(status);
            throw err;
          } else {
            throw err;
          }
        },
      }),
    );
  }
}
