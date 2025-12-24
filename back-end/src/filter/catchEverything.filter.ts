import {
  ExceptionFilter,
  Catch,
  Injectable,
  HttpException,
} from '@nestjs/common';
import { LoggingService } from 'src/logger/logger.service';

@Catch()
@Injectable()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private loggingService: LoggingService) {}

  catch(exception: unknown): void {
    if (!(exception instanceof HttpException)) {
      this.loggingService.error(
        'Global filters caught unhandled exception: ' +
          JSON.stringify(exception),
      );
    }
  }
}
