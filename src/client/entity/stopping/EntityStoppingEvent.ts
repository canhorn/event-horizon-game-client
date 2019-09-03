import { EventType, IEvent, IEventType } from "../../../core/event";

/**
 * Type: EntityStoppingEvent
 * NameSpace: Entity
 * Type: Event
 */
export const ENTITY_STOPPING_EVENT = new EventType(
    "Entity.ENTITY_STOPPING_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = ENTITY_STOPPING_EVENT;
    public data?: EntityStoppingEventData;
}
const instanceOfEvent = new EventClass();
export const createEntityStoppingEvent = (
    data: EntityStoppingEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface EntityStoppingEventData {
    entityId: number;
}
