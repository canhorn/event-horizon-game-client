import { EventType, IEvent, IEventType } from "../../../core/event";

/**
 * Type: EntityChangedSuccessfullyEvent
 * NameSpace: Entity
 * Type: Event
 */
export const ENTITY_CHANGED_SUCCESSFULLY_EVENT = new EventType(
    "Entity.ENTITY_CHANGED_SUCCESSFULLY_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = ENTITY_CHANGED_SUCCESSFULLY_EVENT;
    public data?: EntityChangedSuccessfullyEventData;
}
const instanceOfEvent = new EventClass();
export const createEntityChangedSuccessfullyEvent = (
    data: EntityChangedSuccessfullyEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface EntityChangedSuccessfullyEventData {
    entityId: number;
}
