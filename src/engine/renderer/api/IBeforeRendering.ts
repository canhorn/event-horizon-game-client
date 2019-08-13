export abstract class IBeforeRendering {
    public abstract register(func: () => void): void;
    public abstract unregister(func: () => void): void;
}
