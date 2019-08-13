export abstract class Game {
    public abstract setup(): void;
    public abstract initialize(): void;
    public abstract start(): void;
    public abstract update(): void;
    public abstract dispose(): void;
}
