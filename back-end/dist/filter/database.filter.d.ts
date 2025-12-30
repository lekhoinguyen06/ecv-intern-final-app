import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { LogService } from 'src/log/log.service';
export declare class DatabaseExceptionFilter implements ExceptionFilter {
    private logService;
    constructor(logService: LogService);
    catch(exception: QueryFailedError, host: ArgumentsHost): void;
}
