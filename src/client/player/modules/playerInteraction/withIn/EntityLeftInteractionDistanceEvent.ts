import { EventType, IEvent, IEventType } from "../../../../../core/event";
import { IObjectEntity } from "../../../../entity/api/IObjectEntity";

/**
 * Name: EntityLeftInteractionDistanceEvent
 * NameSpace: Player.Modules.PlayerInteraction
 * Type: Event
 */
export const ENTITY_LEFT_INTERACTION_DISTANCE_EVENT = new EventType(
    "Player.Modules.PlayerInteraction.ENTITY_LEFT_INTERACTION_DISTANCE_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = ENTITY_LEFT_INTERACTION_DISTANCE_EVENT;
    public data?: EntityLeftInteractionDistanceEventData;
}
const instanceOfEvent = new EventClass();
export const createEntityLeftInteractionDistanceEvent = (
    data: EntityLeftInteractionDistanceEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface EntityLeftInteractionDistanceEventData {
    entity: IObjectEntity;
}
