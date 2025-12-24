import {
  ExceptionFilter,
  Catch,
  Injectable,
  HttpException,
} from '@nestjs/common';
import { LogService } from 'src/log/log.service';

@Catch()
@Injectable()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private logService: LogService) {}

  catch(exception: unknown): void {
    const error =
      exception instanceof Error ? exception : new Error(String(exception));
    if (!(exception instanceof HttpException)) {
      this.logService.error(
        'Global filters caught unhandled exception: ',
        error,
      );
    }
  }
}
