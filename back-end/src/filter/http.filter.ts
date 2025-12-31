import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LogService } from 'src/log/log.service';
import { ErrorResponseDTO } from 'src/dto/res.dto';

@Catch(HttpException)
@Injectable()
export class HTTPExceptionFilter implements ExceptionFilter {
  constructor(private logService: LogService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorDetails = {
      code: status,
      name: exception.name,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    console.log(errorDetails);

    // Logging (will log expected usage error such as conflicting email)
    this.logService.error(exception.message, exception);

    const res: ErrorResponseDTO = {
      status: 'error',
      statusCode: status,
      error: errorDetails,
    };

    response.status(status).json(res);
  }
}
