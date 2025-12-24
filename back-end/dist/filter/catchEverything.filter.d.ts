import { ExceptionFilter } from '@nestjs/common';
import { LogService } from 'src/log/log.service';
export declare class CatchEverythingFilter implements ExceptionFilter {
    private logService;
    constructor(logService: LogService);
    catch(exception: unknown): void;
}
