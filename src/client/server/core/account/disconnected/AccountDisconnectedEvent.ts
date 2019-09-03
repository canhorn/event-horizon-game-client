import { EventType, IEvent, IEventType } from "../../../../../core/event";

/**
 * Name: AccountDisconnectedEvent
 * NameSpace: Server.Core
 * Type: Event
 */
export const ACCOUNT_DISCONNECTED_EVENT = new EventType(
    "Server.Core.ACCOUNT_DISCONNECTED_EVENT"
);
class EventClass implements IEvent {
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
