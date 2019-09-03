import { EventType, IEvent, IEventType } from "../../../../core/event";

/**
 * Type: ZonePlayerConnectionDisconnectedEvent
 * NameSpace: Server.Zone
 * Type: Event
 */
export const ZONE_PLAYER_CONNECTION_DISCONNECTED_EVENT = new EventType(
    "Server.Zone.ZONE_PLAYER_CONNECTION_DISCONNECTED_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = ZONE_PLAYER_CONNECTION_DISCONNECTED_EVENT;
    public data?: ZonePlayerConnectionDisconnectedEventData;
}
const instanceOfEvent = new EventClass();
export const createZonePlayerConnectionDisconnectedEvent = (
    data: ZonePlayerConnectionDisconnectedEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface ZonePlayerConnectionDisconnectedEventData {
    code: string;
    error?: Error;
}
