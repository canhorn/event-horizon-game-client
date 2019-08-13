import { ArcFollowCamera } from "babylonjs";
import { ICanvas } from "../../../../engine/canvas/ICanvas";
import { IEventService } from "../../../../engine/event/IEventService";
import { Inject } from "../../../../engine/ioc/Create";
import { LifeCycleEntity } from "../../../../engine/lifecycle/model/LifeCycleEntity";
import { createLogger } from "../../../../engine/logger/InjectLoggerDecorator";
import { ILogger } from "../../../../engine/logger/LoggerFactory";
import { IRenderingScene } from "../../../../engine/renderer/api/IRenderingScene";
import { IObjectEntity } from "../../../entity/api/IObjectEntity";
import {
    IMeshModule,
    MESH_MODULE_NAME,
} from "../../../modules/mesh/api/IMeshModule";
import { MESH_SET_EVENT } from "../../../modules/mesh/set/MeshSetEvent";
import { MeshLoadedEventData } from "../../../modules/modelLoader/loaded/MeshLoadedEvent";
import { ICamera } from "../api/ICamera";

export class MeshRotationFollowCamera extends LifeCycleEntity
    implements ICamera {
    private static DEFAULT_X_ROTATION: number = -Math.PI / 2;
    private static DEFAULT_Y_ROTATION: number = Math.PI / 4;
    private static DEFAULT_RADIUS: number = 25;

    private camera!: ArcFollowCamera;

    constructor(
        private readonly _entity: IObjectEntity,
        private readonly _logger: ILogger = createLogger("WorldFreeCamera"),
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _renderingScene: IRenderingScene = Inject(
            IRenderingScene
        ),
        private readonly _canvas: ICanvas = Inject(ICanvas)
    ) {
        super();
        this._eventService.addEventListener(
            MESH_SET_EVENT,
            this.onMeshSet,
            this
        );
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
        this._eventService.removeEventListener(
            MESH_SET_EVENT,
            this.onMeshSet,
            this
        );
    }
    public update(): void {}
    public draw(): void {}

    public attachControl(): void {
        this.camera.attachControl(this._canvas.drawCanvas, true);
    }
    public setAsActive(): void {
        this._renderingScene.scene.setActiveCameraByID(this.camera.id);
    }
    private onMeshSet({ entityId }: MeshLoadedEventData): void {
        if (this._entity.id !== entityId) {
            return;
        }
        const meshModule = this._entity.getProperty<IMeshModule>(
            MESH_MODULE_NAME
        );
        this.camera.target = meshModule.mesh;
    }
}
