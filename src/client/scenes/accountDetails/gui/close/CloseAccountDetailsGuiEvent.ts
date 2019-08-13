import {
    EventType,
    IEvent,
    IEventType,
} from "../../../../../engine/event/EventType";

/**
 * Type: CloseAccountDetailsGuiEvent
 * NameSpace: Event
 * Type: Event
 */
export const CLOSE_ACCOUNT_DETAILS_GUI_EVENT = new EventType(
    "Event.CLOSE_ACCOUNT_DETAILS_GUI_EVENT"
);
export class EventClass implements IEvent {
    public type: IEventType = CLOSE_ACCOUNT_DETAILS_GUI_EVENT;
    public data?: CloseAccountDetailsGuiEventData;
}
const instanceOfEvent = new EventClass();
export const createCloseAccountDetailsGuiEvent = (
    data: CloseAccountDetailsGuiEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface CloseAccountDetailsGuiEventData {}
