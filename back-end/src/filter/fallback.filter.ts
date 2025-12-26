import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Injectable,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { LogService } from 'src/log/log.service';
import { ErrorResponseDTO } from 'src/dto/res.dto';

@Catch() // Catches everything not caught by other filters
@Injectable()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private logService: LogService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Log the unexpected error
    this.logService.error('Unhandled exception: ', exception as Error);

    // Generic 500 response
    const res: ErrorResponseDTO = {
      status: 'error',
      statusCode: 500,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        name: 'InternalServerError',
        message: 'An unexpected error occurred',
        timestamp: new Date().toISOString(),
        path: request.url,
      },
    };

    response.status(500).json(res);
  }
}
