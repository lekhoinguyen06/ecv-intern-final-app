import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';
import pgErrorMapper from './pgErrorMapper';
import { ErrorResponseDTO } from 'src/dto/res.dto';
import { LogService } from 'src/log/log.service';

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

    // Custom error response
    const errorDetails = {
      code: pgError.code,
      name: pgError.name,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    console.log('Error from DB fiter: ' + JSON.stringify(errorDetails));
    this.logService.silly(
      'Error from DB fiter: ' + JSON.stringify(errorDetails),
    );

    const res: ErrorResponseDTO = {
      status: 'error',
      statusCode: pgError.httpStatus,
      error: errorDetails,
    };

    // Logging (will log expected usage error such as conflicting email)
    this.logService.error(exception.message, exception);

    response.status(pgError.httpStatus).json(res);
  }
}
