import { IServiceMeta } from "../service/IServiceMeta";

export abstract class ICanvas extends IServiceMeta {
    public abstract drawCanvas: HTMLCanvasElement;
}
