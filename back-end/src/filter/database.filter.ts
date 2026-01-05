import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import pgErrorMapper from './pgErrorMapper';
import { ErrorResponseDTO } from 'src/dto/res.dto';
import { LogService } from 'src/log/log.service';
import getApiVersion from 'src/utils/getApiVersion';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  constructor(private logService: LogService) {}

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const pgError = pgErrorMapper(
      (exception.driverError?.['code'] as string) ?? '',
    );
    const apiVersion = getApiVersion();

    // Custom error response
    const errorDetails = {
      code: pgError.code,
      name: pgError.name,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    const res: ErrorResponseDTO = {
      status: 'error',
      statusCode: pgError.httpStatus,
      error: errorDetails,
      meta: {
        apiVersion,
      },
    };

    // Logging (will log expected usage error such as conflicting email)
    this.logService.error(exception.message, exception);

    response.status(pgError.httpStatus).json(res);
  }
}
