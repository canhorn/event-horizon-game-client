import { EventType, IEvent, IEventType } from "../../../../core/event";

/**
 * Type: CoreAdminConnectedEvent
 * NameSpace: Admin.Core
 * Type: Event
 */
export const CORE_ADMIN_CONNECTED_EVENT = new EventType(
    "Admin.Core.CORE_ADMIN_CONNECTED_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = CORE_ADMIN_CONNECTED_EVENT;
    public data?: CoreAdminConnectedEventData;
}
const instanceOfEvent = new EventClass();
export const createCoreAdminConnectedEvent = (
    data: CoreAdminConnectedEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface CoreAdminConnectedEventData {}
