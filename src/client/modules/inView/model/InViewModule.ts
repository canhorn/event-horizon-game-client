import { throttle } from "../../../../core/throttle/Throttle";
import { IEventService } from "../../../../engine/event/IEventService";
import { Inject } from "../../../../engine/ioc/Create";
import { LifeCycleModule } from "../../../../engine/module/model/LifeCycleModule";
import { IRenderingScene } from "../../../../engine/renderer/api/IRenderingScene";
import { IObjectEntity } from "../../../entity/api/IObjectEntity";
import { IMeshModule, MESH_MODULE_NAME } from "../../mesh/api/IMeshModule";
import { IInViewModule } from "../api/IInViewModule";
import { createEntityEnteringViewEvent } from "../entering/EntityEnteringViewEvent";
import { createEntityExitingViewEvent } from "../exiting/EntityExitingViewEvent";

export class InViewModule extends LifeCycleModule implements IInViewModule {
    private _entity: IObjectEntity;
    private _meshModule: IMeshModule;
    private _lastInView: boolean = false;
    private _checkForInView: () => void;
    private _toggleInView: () => void;

    constructor(
        entity: IObjectEntity,
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _renderingScene: IRenderingScene = Inject(
            IRenderingScene
        )
    ) {
        super();
        this._entity = entity;
        this._meshModule = entity.getProperty<IMeshModule>(MESH_MODULE_NAME);
        this._checkForInView = throttle(this.checkForEntityInView, 100, this);
        this._toggleInView = throttle(this.toggleInView, 5000, this);
    }
    public update(): void {
        this._toggleInView();
        this._checkForInView();
    }
    public dispose(): void {}
    public checkForEntityInView() {
        if (!this._renderingScene.scene.activeCamera) {
            return;
        }
        const isInView = this._renderingScene.scene.activeCamera.isInFrustum(
            this._meshModule.mesh
        );
        if (isInView === this._lastInView) {
            return;
        }
        const entityId = this._entity.id;
        if (isInView) {
            this._eventService.publish(
                createEntityEnteringViewEvent({ entityId })
            );
        } else {
            this._eventService.publish(
                createEntityExitingViewEvent({ entityId })
            );
        }
        this._lastInView = isInView;
    }

    private toggleInView() {
        this._lastInView = !this._lastInView;
    }
}
