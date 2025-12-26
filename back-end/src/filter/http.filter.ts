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
export class HTTPExceptionFilter implements ExceptionFilter {
  constructor(private logService: LogService) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // Logging
    this.logService.error(exception.message, exception);

    // Custom error response
    response.status(status).json({
      status: 'error',
      statusCode: status,
      error: {
        code: exception.name,
        message: exception.message,
        timestamp: new Date().toISOString(),
        path: request.url,
      },
    });
  }
}
