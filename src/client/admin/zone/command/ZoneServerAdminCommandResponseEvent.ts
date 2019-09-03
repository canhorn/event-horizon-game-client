import { EventType, IEvent, IEventType } from "../../../../core/event";
import { IZoneCommandResponse } from "../api/IZoneCommandResponse";

/**
 * Type: ZoneServerAdminCommandResponseEvent
 * NameSpace: Client.Admin.Zone
 * Type: Event
 */
export const ZONE_SERVER_ADMIN_COMMAND_RESPONSE_EVENT = new EventType(
    "Client.Admin.Zone.ZONE_SERVER_ADMIN_COMMAND_RESPONSE_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = ZONE_SERVER_ADMIN_COMMAND_RESPONSE_EVENT;
    public data?: ZoneServerAdminCommandResponseEventData;
}
const instanceOfEvent = new EventClass();
export const createZoneServerAdminCommandResponseEvent = (
    data: ZoneServerAdminCommandResponseEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface ZoneServerAdminCommandResponseEventData {
    response: IZoneCommandResponse;
}
