import { EventType, IEvent, IEventType } from "../../../../../core/event";
import { IAccountConnectedInfo } from "../../api/IAccountConnectedInfo";

/**
 * Name: AccountConnectedEvent
 * NameSpace: Server.Core
 * Type: Event
 */
export const ACCOUNT_CONNECTED_EVENT = new EventType(
    "Server.Core.ACCOUNT_CONNECTED_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = ACCOUNT_CONNECTED_EVENT;
    public data?: AccountConnectedEventData<any>;
}
const instanceOfEvent = new EventClass();
export const createAccountConnectedEvent = (
    data: AccountConnectedEventData<any>
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface AccountConnectedEventData<T extends IAccountConnectedInfo> {
    accountInfo: T;
}
