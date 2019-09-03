import { IEventHandler, IEventType } from "../../../../core/event";
import { Inject } from "../../../../core/ioc";
import {
    TRACK_ENTITY_EVENT,
    TrackEntityEventData,
} from "../../../../engine/entity/track/TrackEntityEvent";
import { ITrackedEntity } from "../../api/ITrackedEntity";
import { IEntityTrackerService } from "../IEntityTrackerServices";

/**
 * Name: TrackEntityEvent
 * Type: Event
 */
export class TrackEntityEventHandler implements IEventHandler {
    public type: IEventType = TRACK_ENTITY_EVENT;
    constructor(
        private readonly _entityTrackerService: IEntityTrackerService = Inject(
            IEntityTrackerService
        )
    ) {}
    public handle({ entity }: TrackEntityEventData<ITrackedEntity>): void {
        this._entityTrackerService.track(entity);
    }
}
