import { Engine } from "babylonjs";
import { IServiceMeta } from "../../service/IServiceMeta";

export abstract class IRenderingEngine extends IServiceMeta {
    public abstract engine: Engine;
}
