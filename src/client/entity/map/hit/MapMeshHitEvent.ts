import { Vector3 } from "babylonjs";
import {
    EventType,
    IEvent,
    IEventType,
} from "../../../../engine/event/EventType";
/**
 * Type: MapMeshHitEvent
 * NameSpace: Entity.Map
 * Type: Event
 */
export const MAP_MESH_HIT_EVENT = new EventType(
    "Entity.Map.MAP_MESH_HIT_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = MAP_MESH_HIT_EVENT;
    public data?: MapMeshHitEventData;
}
const instanceOfEvent = new EventClass();
export const createMapMeshHitEvent = (data: MapMeshHitEventData): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface MapMeshHitEventData {
    position: Vector3;
}
