import { EventType, IEvent, IEventType } from "../../../../core/event";

/**
 * Type: EntityExitingViewEvent
 * NameSpace: Module.InView
 * Type: Event
 */
export const ENTITY_EXITING_VIEW_EVENT = new EventType(
    "Module.InView.ENTITY_EXITING_VIEW_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = ENTITY_EXITING_VIEW_EVENT;
    public data?: EntityExitingViewEventData;
}
const instanceOfEvent = new EventClass();
export const createEntityExitingViewEvent = (
    data: EntityExitingViewEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface EntityExitingViewEventData {
    entityId: number;
}
