import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LogService } from 'src/log/log.service';

@Catch(HttpException)
@Injectable()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private logService: LogService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // Logging
    this.logService.error(exception.message, exception);

    // Conditional logging here (with exception.cause.expected === ""), no logging

    // Error rate metric here

    // Custom error response
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: exception.message,
    });
  }
}
