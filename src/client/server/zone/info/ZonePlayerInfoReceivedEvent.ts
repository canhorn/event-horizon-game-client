import { EventType, IEvent, IEventType } from "../../../../core/event";
import { IZonePlayerInfo } from "../api/IZonePlayerInfo";
/**
 * Type: ZonePlayerInfoReceivedEvent
 * NameSpace: Server.Zone.Info
 * Type: Event
 */
export const ZONE_PLAYER_INFO_RECEIVED_EVENT = new EventType(
    "Server.Zone.Info.ZONE_PLAYER_INFO_RECEIVED_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = ZONE_PLAYER_INFO_RECEIVED_EVENT;
    public data?: ZonePlayerInfoReceivedEventData;
}
const instanceOfEvent = new EventClass();
export const createZonePlayerInfoReceivedEvent = (
    data: ZonePlayerInfoReceivedEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface ZonePlayerInfoReceivedEventData {
    zonePlayerInfo: IZonePlayerInfo;
}
