import { OnModuleDestroy } from '@nestjs/common';
import { LogService } from './log/log.service';
export declare class AppService implements OnModuleDestroy {
    private logService;
    constructor(logService: LogService);
    onModuleDestroy(): void;
}
