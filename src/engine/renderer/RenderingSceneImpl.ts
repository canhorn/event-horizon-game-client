import { Scene } from "babylonjs";
import { isObjectDefined } from "../../core/object/ObjectCheck";
import { assert } from "../assert/Assert";
import { Inject } from "../ioc/Create";
import { IRenderingEngine } from "./api/IRenderingEngine";
import { IRenderingScene } from "./api/IRenderingScene";

export class RenderingSceneImpl implements IRenderingScene {
    private _scene!: Scene;
    get scene(): Scene {
        return this._scene;
    }

    constructor(
        private readonly _renderingEngine: IRenderingEngine = Inject(
            IRenderingEngine
        )
    ) {}

    public initialize() {
        assert(this._renderingEngine.engine);
        this._scene = new Scene(this._renderingEngine.engine);
    }
    public dispose() {
        if (isObjectDefined(this._scene)) {
            this._scene.dispose();
        }
    }
}
