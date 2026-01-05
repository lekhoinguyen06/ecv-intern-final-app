import { OnModuleInit } from '@nestjs/common';
import { LogService } from './log.service';
export declare class MetricService implements OnModuleInit {
    private readonly logService;
    private metrics;
    constructor(logService: LogService);
    onModuleInit(): void;
    track(statusCode: number): void;
    private scheduleDailyLog;
    private logAndReset;
}
