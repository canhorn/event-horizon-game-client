import {
    UN_TRACK_ENTITY_EVENT,
    UnTrackEntityEventData,
} from "../../../../engine/entity/unTrack/UnTrackEntityEvent";
import { IEventType } from "../../../../engine/event/EventType";
import { IEventHandler } from "../../../../engine/event/IEventService";
import { Inject } from "../../../../engine/ioc/Create";
import { ITrackedEntity } from "../../api/ITrackedEntity";
import { IEntityTrackerService } from "../IEntityTrackerServices";

/**
 * Name: UnTrackEntityEvent
 * Type: Event
 */
export class UnTrackEntityEventHandler implements IEventHandler {
    public type: IEventType = UN_TRACK_ENTITY_EVENT;
    constructor(
        private readonly _entityTrackerService: IEntityTrackerService = Inject(
            IEntityTrackerService
        )
    ) {}
    public handle({ entity }: UnTrackEntityEventData<ITrackedEntity>): void {
        this._entityTrackerService.unTrack(entity);
    }
}
