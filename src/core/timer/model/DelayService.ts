import { IDelayService } from "../api/IDelayService";

export class DelayService implements IDelayService {
    public delayCall(
        delayInMilliseconds: number,
        fn: () => void,
        context?: any
    ): number {
        return window.setTimeout(() => {
            fn.call(context || this);
        }, delayInMilliseconds);
    }
    public cancelDelayedCall(handle: number): void {
        window.clearTimeout(handle);
    }
}
