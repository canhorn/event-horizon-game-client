export abstract class IStartup {
    public abstract restart(): void;
    public abstract run(): void;
    public abstract stop(): void;
}
