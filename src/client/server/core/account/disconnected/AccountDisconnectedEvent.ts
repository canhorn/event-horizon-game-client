import {
    EventType,
    IEvent,
    IEventType,
} from "../../../../../engine/event/EventType";

// Type: AccountDisconnectedEvent
// NameSpace: Server
// Type: Event

export const ACCOUNT_DISCONNECTED_EVENT = new EventType(
    "Server.ACCOUNT_DISCONNECTED_EVENT"
);
export class EventClass implements IEvent {
    public type: IEventType = ACCOUNT_DISCONNECTED_EVENT;
    public data?: AccountDisconnectedEventData;
}
const instanceOfEvent = new EventClass();
export const createAccountDisconnectedEvent = (
    data: AccountDisconnectedEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface AccountDisconnectedEventData {
    code: string;
    error?: Error;
}
