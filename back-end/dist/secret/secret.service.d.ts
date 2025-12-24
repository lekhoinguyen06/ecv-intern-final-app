export declare class SecretManagerService {
    private client;
    constructor();
    load<T>(secretName: string): Promise<T>;
}
