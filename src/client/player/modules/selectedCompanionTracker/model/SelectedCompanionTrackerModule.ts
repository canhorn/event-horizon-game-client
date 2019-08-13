import { isObjectDefined } from "../../../../../core/object/ObjectCheck";
import { IEventService } from "../../../../../engine/event/IEventService";
import { Inject } from "../../../../../engine/ioc/Create";
import { LifeCycleModule } from "../../../../../engine/module/model/LifeCycleModule";
import { IQueryService } from "../../../../../engine/query/IQueryService";
import { IObjectEntity } from "../../../../entity/api/IObjectEntity";
import { createQueryForEntity } from "../../../../entity/tracked/query/QueryForEntity";
import { createIdTag } from "../../../../entity/tracked/tagTypes/CreateIdTag";
import { CLEAR_POINTER_HIT_ENTITY_EVENT } from "../../../../systems/screenPointer/clear/ClearPointerHitEntityEvent";
import {
    POINTER_HIT_ENTITY_EVENT,
    PointerHitEntityEventData,
} from "../../../../systems/screenPointer/entity/PointerHitEntityEvent";
import { IPlayerEntity } from "../../../api/IPlayerEntity";
import { IOwnerState, OWNER_STATE_PROPERTY_NAME } from "../api/IOwnerState";
import { ISelectedCompanionTrackerModule } from "../api/ISelectedCompanionTrackerModule";

const NOT_SELECTED_ID: number = -1;
export default class SelectedCompanionTrackerModule extends LifeCycleModule
    implements ISelectedCompanionTrackerModule {
    private _selectedEntityId: number = NOT_SELECTED_ID;

    public get hasSelectedEntity(): boolean {
        return this._selectedEntityId !== NOT_SELECTED_ID;
    }
    public get selectedEntityId(): number {
        return this._selectedEntityId;
    }

    constructor(
        private readonly _entity: IPlayerEntity,
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _queryService: IQueryService = Inject(IQueryService)
    ) {
        super();
        this._eventService.addEventListener(
            POINTER_HIT_ENTITY_EVENT,
            this.onPickHitEntity,
            this
        );
        this._eventService.addEventListener(
            CLEAR_POINTER_HIT_ENTITY_EVENT,
            this.onClearPickHitEntity,
            this
        );
    }
    public update(): void {}
    public dispose(): void {
        this._eventService.removeEventListener(
            POINTER_HIT_ENTITY_EVENT,
            this.onPickHitEntity,
            this
        );
        this._eventService.removeEventListener(
            CLEAR_POINTER_HIT_ENTITY_EVENT,
            this.onClearPickHitEntity,
            this
        );
    }

    private onPickHitEntity({ entityId }: PointerHitEntityEventData) {
        if (this._entity.entityId === entityId) {
            return;
        }
        // Lookup entity by id
        const hitEntity = this._queryService.query(
            createQueryForEntity<IObjectEntity>({
                tag: createIdTag(entityId),
            })
        ).result[0];
        // Check if the entity is owned by the entity attached to this module.
        const hitEntityOwnerState = hitEntity.getProperty<IOwnerState>(
            OWNER_STATE_PROPERTY_NAME
        );
        if (
            isObjectDefined(hitEntityOwnerState) &&
            hitEntityOwnerState.ownerId === this._entity.globalId
        ) {
            this._selectedEntityId = entityId;
        }
    }
    private onClearPickHitEntity() {
        this._selectedEntityId = NOT_SELECTED_ID;
    }
}
