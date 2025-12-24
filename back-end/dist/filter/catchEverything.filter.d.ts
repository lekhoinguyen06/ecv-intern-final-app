import { ExceptionFilter } from '@nestjs/common';
import { LoggingService } from 'src/logger/logger.service';
export declare class CatchEverythingFilter implements ExceptionFilter {
    private loggingService;
    constructor(loggingService: LoggingService);
    catch(exception: unknown): void;
}
