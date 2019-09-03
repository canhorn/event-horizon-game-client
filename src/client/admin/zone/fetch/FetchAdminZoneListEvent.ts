import { EventType, IEvent, IEventType } from "../../../../core/event";

/**
 * Type: FetchAdminZoneListEvent
 * NameSpace: Admin.Zone
 * Type: Event
 */
export const FETCH_ADMIN_ZONE_LIST_EVENT = new EventType(
    "Admin.Zone.FETCH_ADMIN_ZONE_LIST_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = FETCH_ADMIN_ZONE_LIST_EVENT;
    public data?: FetchAdminZoneListEventData;
}
const instanceOfEvent = new EventClass();
export const createFetchAdminZoneListEvent = (
    data: FetchAdminZoneListEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface FetchAdminZoneListEventData {}
