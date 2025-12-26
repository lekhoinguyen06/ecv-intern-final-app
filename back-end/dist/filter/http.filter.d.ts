import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
import { LogService } from 'src/log/log.service';
export declare class HTTPExceptionFilter implements ExceptionFilter {
    private logService;
    constructor(logService: LogService);
    catch(exception: HttpException, host: ArgumentsHost): void;
}
