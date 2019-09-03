import { FreeCamera, Vector3 } from "babylonjs";
import { IGuid } from "../../../../core/guid/IGuid";
import { Inject } from "../../../../core/ioc";
import { createLogger } from "../../../../core/logger";
import { ILogger } from "../../../../core/logger";
import { ICanvas } from "../../../../engine/canvas/ICanvas";
import { LifeCycleEntity } from "../../../../engine/lifecycle/model/LifeCycleEntity";
import { IRenderingScene } from "../../../../engine/renderer/api/IRenderingScene";
import { ICamera } from "../api/ICamera";

export class WorldFreeCamera extends LifeCycleEntity implements ICamera {
    private camera!: FreeCamera;

    constructor(
        private readonly _logger: ILogger = createLogger("WorldFreeCamera"),
        private readonly _renderingScene: IRenderingScene = Inject(
            IRenderingScene
        ),
        private readonly _canvas: ICanvas = Inject(ICanvas),
        private readonly _guid: IGuid = Inject(IGuid)
    ) {
        super();
    }

    public initialize() {
        this._logger.debug("initialize");
        // This creates and positions a free camera (non-mesh)
        this.camera = new FreeCamera(
            `player_camera_${this._guid.guid()}`,
            new Vector3(0, 10, -30),
            this._renderingScene.scene
        );
        // This targets the camera to scene origin
        this.camera.setTarget(Vector3.Zero());
        // This attaches the camera to the canvas
        // this.camera.keysUp.push(87);    //W
        // this.camera.keysDown.push(83)   //D
        // this.camera.keysLeft.push(65);  //A
        // this.camera.keysRight.push(68); //S
    }

    public onDispose() {
        this.camera.dispose();
    }
    public update() {}
    public draw(): void {}

    public attachControl() {
        this.camera.attachControl(this._canvas.drawCanvas, true);
    }
    public setAsActive() {
        this._renderingScene.scene.setActiveCameraByID(this.camera.id);
    }
}
