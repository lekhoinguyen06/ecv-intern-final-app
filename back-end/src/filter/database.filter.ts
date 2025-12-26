import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import pgErrorMapper from './pgErrorMapper';
import { ErrorResponseDTO } from 'src/dto/res.dto';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const pgError = pgErrorMapper(
      (exception.driverError?.['code'] as string) ?? '',
    );

    // Custom error response
    const res: ErrorResponseDTO = {
      status: 'error',
      statusCode: pgError.httpStatus,
      error: {
        code: pgError.code,
        name: pgError.name,
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      },
    };
    response.status(pgError.httpStatus).json(res);
  }
}
