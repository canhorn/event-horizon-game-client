import { EventType, IEvent, IEventType } from "../../../engine/event/EventType";

/**
 * Type: ZoneChangedEvent
 * NameSpace: Zone
 * Type: Event
 */
export const ZONE_CHANGED_EVENT = new EventType("Zone.ZONE_CHANGED_EVENT");
class EventClass implements IEvent {
    public type: IEventType = ZONE_CHANGED_EVENT;
    public data?: ZoneChangedEventData;
}
const instanceOfEvent = new EventClass();
export const createZoneChangedEvent = (data: ZoneChangedEventData): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface ZoneChangedEventData {}
