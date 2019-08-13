import {
    EventType,
    IEvent,
    IEventType,
} from "../../../../../engine/event/EventType";
import { IObjectEntity } from "../../../../entity/api/IObjectEntity";

/**
 * Name: EntityWithinInteractionDistanceEvent
 * NameSpace: Client.Player.Modules
 * Type: Event
 */
export const ENTITY_WITHIN_INTERACTION_DISTANCE_EVENT = new EventType(
    "Client.Player.Modules.ENTITY_WITHIN_INTERACTION_DISTANCE_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = ENTITY_WITHIN_INTERACTION_DISTANCE_EVENT;
    public data?: EntityWithinInteractionDistanceEventData;
}
const instanceOfEvent = new EventClass();
export const createEntityWithinInteractionDistanceEvent = (
    data: EntityWithinInteractionDistanceEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface EntityWithinInteractionDistanceEventData {
    entity: IObjectEntity;
    distanceToPlayer: number;
}
