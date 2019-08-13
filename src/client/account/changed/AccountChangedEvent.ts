import { EventType, IEvent, IEventType } from "../../../engine/event/EventType";
/**
 * Type: AccountChangedEvent
 * NameSpace: Account
 * Type: Event
 */
export const ACCOUNT_CHANGED_EVENT = new EventType(
    "Account.ACCOUNT_CHANGED_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = ACCOUNT_CHANGED_EVENT;
    public data?: AccountChangedEventData;
}
const instanceOfEvent = new EventClass();
export const createAccountChangedEvent = (
    data: AccountChangedEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface AccountChangedEventData {}
