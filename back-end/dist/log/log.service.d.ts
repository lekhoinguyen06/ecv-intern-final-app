export declare class LogService {
    private logger;
    constructor();
    info(info: string): void;
    warn(warn: string): void;
    error(message: string, error?: Error, context?: object): void;
}
