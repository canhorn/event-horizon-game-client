import { Vector3 } from "babylonjs";
import { EventType, IEvent, IEventType } from "../../../engine/event/EventType";

/**
 * Type: EntityMovingEvent
 * NameSpace: Entity
 * Type: Event
 */
export const ENTITY_MOVING_EVENT = new EventType("Entity.ENTITY_MOVING_EVENT");
class EventClass implements IEvent {
    public type: IEventType = ENTITY_MOVING_EVENT;
    public data?: EntityMovingEventData;
}
const instanceOfEvent = new EventClass();
export const createEntityMovingEvent = (
    data: EntityMovingEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface EntityMovingEventData {
    entityId: number;
}
