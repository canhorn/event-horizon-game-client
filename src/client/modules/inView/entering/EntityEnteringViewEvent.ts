import {
    EventType,
    IEvent,
    IEventType,
} from "../../../../engine/event/EventType";

/**
 * Type: EntityEnteringViewEvent
 * NameSpace: Module.InView
 * Type: Event
 */
export const ENTITY_ENTERING_VIEW_EVENT = new EventType(
    "Module.InView.ENTITY_ENTERING_VIEW_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = ENTITY_ENTERING_VIEW_EVENT;
    public data?: EntityEnteringViewEventData;
}
const instanceOfEvent = new EventClass();
export const createEntityEnteringViewEvent = (
    data: EntityEnteringViewEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface EntityEnteringViewEventData {
    entityId: number;
}
