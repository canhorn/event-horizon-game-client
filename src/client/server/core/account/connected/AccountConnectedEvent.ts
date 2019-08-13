import { EventType, IEvent } from "../../../../../engine/event/EventType";
import { IAccountConnectedInfo } from "../../api/IAccountConnectedInfo";

// Type: AccountConnectedEvent
// NameSpace: ServerCore
// Type: Event

export const ACCOUNT_CONNECTED_EVENT = new EventType(
    "ServerCore.ACCOUNT_CONNECTED_EVENT"
);
export class EventClass implements IEvent {
    public type: EventType = ACCOUNT_CONNECTED_EVENT;
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
