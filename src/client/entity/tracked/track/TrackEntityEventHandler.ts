import {
    TRACK_ENTITY_EVENT,
    TrackEntityEventData,
} from "../../../../engine/entity/track/TrackEntityEvent";
import { IEventType } from "../../../../engine/event/EventType";
import { IEventHandler } from "../../../../engine/event/IEventService";
import { Inject } from "../../../../engine/ioc/Create";
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
