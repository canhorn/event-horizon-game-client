import { Scene } from "babylonjs";
import { IServiceMeta } from "../../service/IServiceMeta";

export abstract class IRenderingScene extends IServiceMeta {
    public abstract scene: Scene;
}
