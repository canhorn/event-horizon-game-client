import { IEventService } from "../../../../../core/event";
import { Inject } from "../../../../../core/ioc";
import { IInitializable } from "../../../../../engine/lifecycle/IInitializable";
import { IRegisterInitializable } from "../../../../../engine/lifecycle/register/IRegisterInitializable";
import { LifeCycleModule } from "../../../../../engine/module/model/LifeCycleModule";
import { MeshRotationFollowCamera } from "../../../../entity/camera/model/MeshRotationFollowCamera";
import { WorldFreeCamera } from "../../../../entity/camera/model/WorldFreeCamera";
import { ICamera } from "../../../../systems/camera/api/ICamera";
import { IPlayerEntity } from "../../../api/IPlayerEntity";
import { ICameraModule } from "../api/ICameraModule";
import { SET_CAMERA_TO_FOLLOW_EVENT } from "../set/SetCameraToFollowEvent";
import { SET_CAMERA_TO_FREE_EVENT } from "../set/SetCameraToFreeEvent";

export class CameraModule extends LifeCycleModule
    implements ICameraModule, IInitializable {
    private _followCamera!: ICamera;
    private _freeCamera!: ICamera;

    constructor(
        private readonly _entity: IPlayerEntity,
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _registerInitializable: IRegisterInitializable = Inject(
            IRegisterInitializable
        )
    ) {
        super();
        this._registerInitializable.register(this);
    }
    public initialize(): void {
        this._freeCamera = new WorldFreeCamera();

        this._followCamera = new MeshRotationFollowCamera(this._entity);
    }
    public postInitialize(): void {
        this.onSetCameraToFollow();
        this.setupEvents();
    }
    public update(): void {}
    public dispose(): void {
        this._registerInitializable.unregister(this);
        this.removeEvents();
        this._freeCamera.dispose();
        this._followCamera.dispose();
    }

    private setupEvents() {
        this._eventService.on(
            SET_CAMERA_TO_FOLLOW_EVENT,
            this.onSetCameraToFollow,
            this
        );
        this._eventService.on(
            SET_CAMERA_TO_FREE_EVENT,
            this.onSetCameraToFree,
            this
        );
    }
    private removeEvents() {
        this._eventService.off(
            SET_CAMERA_TO_FOLLOW_EVENT,
            this.onSetCameraToFollow,
            this
        );
        this._eventService.off(
            SET_CAMERA_TO_FREE_EVENT,
            this.onSetCameraToFree,
            this
        );
    }

    private onSetCameraToFollow() {
        this._followCamera.attachControl();
        this._followCamera.setAsActive();
    }
    private onSetCameraToFree() {
        this._freeCamera.attachControl();
        this._freeCamera.setAsActive();
    }
}
