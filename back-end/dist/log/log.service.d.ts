export declare class LogService {
    private consoleLogger;
    private cloudWatchLogger;
    constructor();
    info(info: string): void;
    warn(warn: string): void;
    error(message: string, error?: Error, context?: object): void;
}
