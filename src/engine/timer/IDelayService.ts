export abstract class IDelayService {
    public abstract delayCall(
        delayInMilliseconds: number,
        fn: () => void,
        context?: any
    ): number;
    public abstract cancelDelayedCall(handle: number): void;
}
