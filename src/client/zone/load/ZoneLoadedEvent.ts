import { EventType, IEvent, IEventType } from "../../../core/event";

/**
 * Type: ZoneLoadedEvent
 * NameSpace: Client.Zone
 * Type: Event
 */
export const ZONE_LOADED_EVENT = new EventType("Client.Zone.ZONE_LOADED_EVENT");
class EventClass implements IEvent {
    public type: IEventType = ZONE_LOADED_EVENT;
    public data?: ZoneLoadedEventData;
}
const instanceOfEvent = new EventClass();
export const createZoneLoadedEvent = (data: ZoneLoadedEventData): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface ZoneLoadedEventData {}
