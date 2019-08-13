import {
    EventType,
    IEvent,
    IEventType,
} from "../../../../engine/event/EventType";

/**
 * Type: ClientActionReceivedEvent
 * NameSpace: Server.Zone
 * Type: Event
 */
export const CLIENT_ACTION_RECEIVED_EVENT = new EventType(
    "Server.Zone.CLIENT_ACTION_RECEIVED_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = CLIENT_ACTION_RECEIVED_EVENT;
    public data?: ClientActionReceivedEventData;
}
const instanceOfEvent = new EventClass();
export const createClientActionReceivedEvent = (
    data: ClientActionReceivedEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface ClientActionReceivedEventData {
    action: string;
    data: any;
}
