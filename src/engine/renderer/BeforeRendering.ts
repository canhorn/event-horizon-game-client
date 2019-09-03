import { Inject } from "../../core/ioc";
import { IBeforeRendering } from "./api/IBeforeRendering";
import { IRenderingScene } from "./api/IRenderingScene";

export class BeforeRendering implements IBeforeRendering {
    constructor(
        private readonly _renderingScene: IRenderingScene = Inject(
            IRenderingScene
        )
    ) {}

    public register(func: () => void): void {
        this._renderingScene.scene.registerBeforeRender(func);
    }
    public unregister(func: () => void): void {
        this._renderingScene.scene.unregisterBeforeRender(func);
    }
}
