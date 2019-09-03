import { ISystemWindow } from "../api/ISystemWindow";

export class SystemWindow extends ISystemWindow {
    constructor(window: Window) {
        super();
    }
    public getProp<T>(prop: string): T {
        return (window as any)[prop] as T;
    }
    public setProp(prop: string, value: any): void {
        (window as any)[prop] = value;
    }
    public setInterval(handler: string | Function, timeout?: number): number {
        return window.setInterval(handler, timeout);
    }
    public clearInterval(handle?: number): void {
        window.clearInterval(handle);
    }
}
