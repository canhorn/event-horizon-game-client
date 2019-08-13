import { IEventService } from "../../../../../engine/event/IEventService";
import { Inject } from "../../../../../engine/ioc/Create";
import { LifeCycleModule } from "../../../../../engine/module/model/LifeCycleModule";
import { IObjectEntity } from "../../../../entity/api/IObjectEntity";
import {
    MAP_MESH_HIT_EVENT,
    MapMeshHitEventData,
} from "../../../../entity/map/hit/MapMeshHitEvent";
import { createPlayerActionEvent } from "../../../action/PlayerActionEvent";
import {
    ISelectedCompanionTrackerModule,
    SELECTED_COMPANION_TRACKER_MODULE_NAME,
} from "../../selectedCompanionTracker/api/ISelectedCompanionTrackerModule";
import { IMoveSelectedModule } from "../api/IMoveSelectedModule";

export default class MoveSelectedModule extends LifeCycleModule
    implements IMoveSelectedModule {
    constructor(
        private readonly _entity: IObjectEntity,
        private readonly _eventService: IEventService = Inject(IEventService)
    ) {
        super();
        this._eventService.addEventListener(
            MAP_MESH_HIT_EVENT,
            this.onMapMeshHit,
            this
        );
    }
    public update(): void {}
    public dispose(): void {
        this._eventService.removeEventListener(
            MAP_MESH_HIT_EVENT,
            this.onMapMeshHit,
            this
        );
    }

    private onMapMeshHit({ position }: MapMeshHitEventData) {
        const selectedCompanionTrackerModule: ISelectedCompanionTrackerModule = this._entity.getProperty(
            SELECTED_COMPANION_TRACKER_MODULE_NAME
        );

        if (selectedCompanionTrackerModule.hasSelectedEntity) {
            this._eventService.publish(
                createPlayerActionEvent({
                    action: "Player.RUN_SKILL",
                    data: {
                        casterId: this._entity.id,
                        targetId:
                            selectedCompanionTrackerModule.selectedEntityId,
                        targetPosition: position,
                        skillId: "move_to",
                    },
                })
            );
        }
    }
}
