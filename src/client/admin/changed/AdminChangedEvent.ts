import { EventType, IEvent, IEventType } from "../../../core/event";

/**
 * Type: AdminChangedEvent
 * NameSpace: Admin
 * Type: Event
 */
export const ADMIN_CHANGED_EVENT = new EventType("Admin.ADMIN_CHANGED_EVENT");
class EventClass implements IEvent {
    public type: IEventType = ADMIN_CHANGED_EVENT;
    public data?: AdminChangedEventData;
}
const instanceOfEvent = new EventClass();
export const createAdminChangedEvent = (
    data: AdminChangedEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface AdminChangedEventData {}
