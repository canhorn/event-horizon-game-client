import {
    EventType,
    IEvent,
    IEventType,
} from "../../../../engine/event/EventType";
/**
 * Type: MeshSetEvent
 * NameSpace: Module.Mesh
 * Type: Event
 */
export const MESH_SET_EVENT = new EventType("Module.Mesh.MESH_SET_EVENT");
class EventClass implements IEvent {
    public type: IEventType = MESH_SET_EVENT;
    public data?: MeshSetEventData;
}
const instanceOfEvent = new EventClass();
export const createMeshSetEvent = (data: MeshSetEventData): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface MeshSetEventData {
    id: number;
}
