import { EventType, IEvent, IEventType } from "../../../core/event";

/**
 * Type: ShowDebuggingMessageEvent
 * NameSpace: Debugging
 * Type: Event
 */
export const SHOW_DEBUGGING_MESSAGE_EVENT = new EventType(
    "Debugging.SHOW_DEBUGGING_MESSAGE_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = SHOW_DEBUGGING_MESSAGE_EVENT;
    public data?: ShowDebuggingMessageEventData;
}
const instanceOfEvent = new EventClass();
export const createShowDebuggingMessageEvent = (
    data: ShowDebuggingMessageEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface ShowDebuggingMessageEventData {
    message: string;
}
export type ShowDebuggingMessageEventResultType = undefined;
