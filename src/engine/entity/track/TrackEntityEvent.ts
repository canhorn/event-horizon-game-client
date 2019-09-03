import { EventType, IEvent, IEventType } from "../../../core/event";
import { IEntity } from "../api/IEntity";
/**
 * Type: TrackEntityEvent
 * NameSpace: Entity
 * Type: Event
 */
export const TRACK_ENTITY_EVENT = new EventType("Entity.TRACK_ENTITY_EVENT");
class EventClass implements IEvent {
    public type: IEventType = TRACK_ENTITY_EVENT;
    public data?: TrackEntityEventData<any>;
}
const instanceOfEvent = new EventClass();
export const createTrackEntityEvent = (
    data: TrackEntityEventData<any>
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface TrackEntityEventData<T extends IEntity> {
    entity: T;
}
