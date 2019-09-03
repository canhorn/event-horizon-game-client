import { ArcFollowCamera } from "babylonjs";
import { IEventService } from "../../../../core/event";
import { Inject } from "../../../../core/ioc";
import { createLogger, ILogger } from "../../../../core/logger";
import { ICanvas } from "../../../../engine/canvas/ICanvas";
import { LifeCycleEntity } from "../../../../engine/lifecycle/model/LifeCycleEntity";
import { IRenderingScene } from "../../../../engine/renderer/api/IRenderingScene";
import {
    IMeshModule,
    MESH_MODULE_NAME,
} from "../../../modules/mesh/api/IMeshModule";
import {
    MESH_SET_EVENT,
    MeshSetEventData,
} from "../../../modules/mesh/set/MeshSetEvent";
import { IObjectEntity } from "../../api/IObjectEntity";

export class MeshRotationFollowCamera extends LifeCycleEntity {
    private static DEFAULT_X_ROTATION: number = -Math.PI / 2;
    private static DEFAULT_Y_ROTATION: number = Math.PI / 4;
    private static DEFAULT_RADIUS: number = 25;

    private camera!: ArcFollowCamera;

    constructor(
        private readonly _entity: IObjectEntity,
        private readonly _logger: ILogger = createLogger(
            "MeshRotationFollowCamera"
        ),
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _renderingScene: IRenderingScene = Inject(
            IRenderingScene
        ),
        private readonly _canvas: ICanvas = Inject(ICanvas)
    ) {
        super();
        this._eventService.on(MESH_SET_EVENT, this.onMeshSet, this);
    }

    public initialize(): void {
        this._logger.debug("initialize");
        const meshModule = this._entity.getProperty<IMeshModule>(
            MESH_MODULE_NAME
        );
        this.camera = new ArcFollowCamera(
            "player_follow_camera",
            MeshRotationFollowCamera.DEFAULT_X_ROTATION,
            MeshRotationFollowCamera.DEFAULT_Y_ROTATION,
            MeshRotationFollowCamera.DEFAULT_RADIUS,
            meshModule.mesh,
            this._renderingScene.scene
        );
        this.camera.speed = -1;
    }

    public onDispose(): void {
        this.camera.dispose();
        this._eventService.off(MESH_SET_EVENT, this.onMeshSet, this);
    }
    public update(): void {}
    public draw(): void {}

    public attachControl(): void {
        this.camera.attachControl(this._canvas.drawCanvas, true);
    }
    public setAsActive(): void {
        this._renderingScene.scene.setActiveCameraByID(this.camera.id);
    }
    private onMeshSet({ id }: MeshSetEventData): void {
        if (this._entity.id !== id) {
            return;
        }
        const meshModule = this._entity.getProperty<IMeshModule>(
            MESH_MODULE_NAME
        );
        this.camera.target = meshModule.mesh;
    }
}
