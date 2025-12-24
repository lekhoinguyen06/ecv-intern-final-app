import { ExceptionFilter, Catch, Injectable } from '@nestjs/common';
import { LoggingService } from 'src/logger/logger.service';

@Catch()
@Injectable()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private loggingService: LoggingService) {}

  catch(exception: unknown): void {
    this.loggingService.error(
      'Global filters caught unhandled exception: ' + JSON.stringify(exception),
    );
  }
}
