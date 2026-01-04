import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'node_modules/rxjs/dist/types';
import { map } from 'node_modules/rxjs/dist/types/operators';

import { SuccessResponseDTO } from 'src/dto/res.dto';

@Injectable()
export class SuccessResponseTransformInterceptor<T> implements NestInterceptor<
  T,
  SuccessResponseDTO<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SuccessResponseDTO<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data: T) => ({
        status: 'success',
        statusCode,
        data,
      })),
    );
  }
}
