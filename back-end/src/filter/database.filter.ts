import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import pgErrorMapper from './pgErrorMapper';
import { ErrorObj } from 'src/dto/res.dto';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const pgError = pgErrorMapper(
      (exception.driverError?.['code'] as string) ?? '',
    );

    // Custom error response
    const errorDetail: ErrorObj = {
      code: pgError.code,
      name: pgError.name,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    throw new HttpException(errorDetail, pgError.httpStatus);
  }
}
