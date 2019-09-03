import { EventType, IEvent, IEventType } from "../../../core/event";
import { IEntity } from "../api/IEntity";

/**
 * Type: UnTrackEntityEvent
 * NameSpace: Entity
 * Type: Event
 */
export const UN_TRACK_ENTITY_EVENT = new EventType(
    "Entity.UN_TRACK_ENTITY_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = UN_TRACK_ENTITY_EVENT;
    public data?: UnTrackEntityEventData<any>;
}
const instanceOfEvent = new EventClass();
export const createUnTrackEntityEvent = (
    data: UnTrackEntityEventData<any>
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface UnTrackEntityEventData<T extends IEntity> {
    entity: T;
}
