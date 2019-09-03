import { IEventService } from "../../../../../core/event";
import { Inject } from "../../../../../core/ioc";
import { LifeCycleModule } from "../../../../../engine/module/model/LifeCycleModule";
import { IObjectEntity } from "../../../../entity/api/IObjectEntity";
import { CLEAR_POINTER_HIT_ENTITY_EVENT } from "../../../../systems/screenPointer/clear/ClearPointerHitEntityEvent";
import {
    POINTER_HIT_ENTITY_EVENT,
    PointerHitEntityEventData,
} from "../../../../systems/screenPointer/entity/PointerHitEntityEvent";
import { ISelectedTrackerModule } from "../api/ISelectedTrackerModule";

const NOT_SELECTED_ID: number = -1;

export class SelectedTrackerModule extends LifeCycleModule
    implements ISelectedTrackerModule {
    private _selectedEntityId: number = NOT_SELECTED_ID;

    public get hasSelectedEntity(): boolean {
        return this._selectedEntityId !== NOT_SELECTED_ID;
    }
    public get selectedEntityId(): number {
        return this._selectedEntityId;
    }

    constructor(
        private readonly _entity: IObjectEntity,
        private readonly _eventService: IEventService = Inject(IEventService)
    ) {
        super();
        this._eventService.on(
            POINTER_HIT_ENTITY_EVENT,
            this.onPickHitEntity,
            this
        );
        this._eventService.on(
            CLEAR_POINTER_HIT_ENTITY_EVENT,
            this.onClearPickHitEntity,
            this
        );
    }
    public update(): void {}
    public dispose(): void {
        this._eventService.off(
            POINTER_HIT_ENTITY_EVENT,
            this.onPickHitEntity,
            this
        );
        this._eventService.off(
            CLEAR_POINTER_HIT_ENTITY_EVENT,
            this.onClearPickHitEntity,
            this
        );
    }

    private onPickHitEntity({ entityId }: PointerHitEntityEventData) {
        this._selectedEntityId = entityId;
    }
    private onClearPickHitEntity() {
        this._selectedEntityId = NOT_SELECTED_ID;
    }
}
