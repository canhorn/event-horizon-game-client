import { EventType, IEvent, IEventType } from "../../../../core/event";

/**
 * Type: ZoneAdminConnectedEvent
 * NameSpace: Admin.Zone
 * Type: Event
 */
export const ZONE_ADMIN_CONNECTED_EVENT = new EventType(
    "Admin.Zone.ZONE_ADMIN_CONNECTED_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = ZONE_ADMIN_CONNECTED_EVENT;
    public data?: ZoneAdminConnectedEventData;
}
const instanceOfEvent = new EventClass();
export const createZoneAdminConnectedEvent = (
    data: ZoneAdminConnectedEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface ZoneAdminConnectedEventData {}
