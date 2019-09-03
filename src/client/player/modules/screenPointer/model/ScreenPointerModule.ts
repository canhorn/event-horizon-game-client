import {
    Nullable,
    Observer,
    PickingInfo,
    PointerEventTypes,
    PointerInfo,
} from "babylonjs";
import { autobind } from "../../../../../core/autobind/autobind";
import { IEventService } from "../../../../../core/event";
import { Inject } from "../../../../../core/ioc";
import { createLogger, ILogger } from "../../../../../core/logger";
import { isObjectDefined } from "../../../../../core/object/ObjectCheck";
import { LifeCycleModule } from "../../../../../engine/module/model/LifeCycleModule";
import { IRenderingScene } from "../../../../../engine/renderer/api/IRenderingScene";
import { shadowAsEngineMesh } from "../../../../../engine/renderer/EngineMesh";
import { createPointerHitEntityEvent } from "../../../../systems/screenPointer/entity/PointerHitEntityEvent";
import { createPointerHitMeshEvent } from "../../../../systems/screenPointer/mesh/PointerHitMeshEvent";
import { PlayerEntity } from "../../../model/PlayerEntity";
import { IScreenPointerModule } from "../api/IScreenPointerModule";

export default class ScreenPointerModule extends LifeCycleModule
    implements IScreenPointerModule {
    private _onPointerActionObserver: Nullable<Observer<PointerInfo>>;

    constructor(
        private readonly _entity: PlayerEntity,
        private readonly _logger: ILogger = createLogger("ScreenPointerModule"),
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _renderingScene: IRenderingScene = Inject(
            IRenderingScene
        )
    ) {
        super();
        this._onPointerActionObserver = this._renderingScene.scene.onPointerObservable.add(
            this.onPointerAction
        );
    }
    public update(): void {}
    public dispose(): void {
        this._renderingScene.scene.onPointerObservable.remove(
            this._onPointerActionObserver
        );
    }

    @autobind
    private onPointerAction(pointerInfo: PointerInfo) {
        switch (pointerInfo.type) {
            // On Full pointer click and hit publish Pick Hit Entity Event
            case PointerEventTypes.POINTERUP:
                if (pointerInfo.pickInfo && pointerInfo.pickInfo.hit) {
                    this.onEntityHit(pointerInfo.pickInfo);
                }
                break;
        }
    }

    private onEntityHit(pickInfo: PickingInfo) {
        if (!pickInfo || !pickInfo.pickedMesh || !pickInfo.pickedPoint) {
            return;
        }
        const pickedMesh = shadowAsEngineMesh(pickInfo.pickedMesh);
        if (isObjectDefined(pickedMesh.ownerEntityId)) {
            this._eventService.publish(
                createPointerHitEntityEvent({
                    entityId: pickedMesh.ownerEntityId,
                })
            );
        } else {
            this._eventService.publish(
                createPointerHitMeshEvent({
                    meshName: pickInfo.pickedMesh.name,
                    position: pickInfo.pickedPoint,
                })
            );
        }
    }
}
