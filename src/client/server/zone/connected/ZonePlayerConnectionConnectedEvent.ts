import { EventType, IEvent, IEventType } from "../../../../core/event";

/**
 * Type: ZonePlayerConnectionConnectedEvent
 * NameSpace: Server.Zone
 * Type: Event
 */
export const ZONE_PLAYER_CONNECTION_CONNECTED_EVENT = new EventType(
    "Server.Zone.ZONE_PLAYER_CONNECTION_CONNECTED_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = ZONE_PLAYER_CONNECTION_CONNECTED_EVENT;
    public data?: ZonePlayerConnectionConnectedEventData;
}
const instanceOfEvent = new EventClass();
export const createZonePlayerConnectionConnectedEvent = (
    data: ZonePlayerConnectionConnectedEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface ZonePlayerConnectionConnectedEventData {}
