import {
    EventType,
    IEvent,
    IEventType,
} from "../../../../engine/event/EventType";
/**
 * Type: MapMeshReadyEvent
 * NameSpace: Entity.Map
 * Type: Event
 */
export const MAP_MESH_READY_EVENT = new EventType(
    "Entity.Map.MAP_MESH_READY_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = MAP_MESH_READY_EVENT;
    public data?: MapMeshReadyEventData;
}
const instanceOfEvent = new EventClass();
export const createMapMeshReadyEvent = (
    data: MapMeshReadyEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface MapMeshReadyEventData {}
