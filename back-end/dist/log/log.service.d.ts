export declare class LogService {
    private consoleLogger;
    private cloudWatchLogger;
    private metricLogger;
    constructor();
    metric(obj: object): void;
    silly(silly: string): void;
    info(info: string): void;
    warn(warn: string): void;
    error(message: string, error?: Error, context?: object): void;
}
