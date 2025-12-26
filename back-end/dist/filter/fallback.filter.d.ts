import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { LogService } from 'src/log/log.service';
export declare class AllExceptionsFilter implements ExceptionFilter {
    private logService;
    constructor(logService: LogService);
    catch(exception: unknown, host: ArgumentsHost): void;
}
