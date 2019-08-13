/**
 * This is a contract against system client functionality.
 */
export abstract class ISystemWindow {
    public abstract setInterval(
        handler: string | Function,
        timeout?: number
    ): number;
    public abstract clearInterval(handle?: number): void;
    public abstract getProp<T>(prop: string): T;
    public abstract setProp(prop: string, value: any): void;
}
