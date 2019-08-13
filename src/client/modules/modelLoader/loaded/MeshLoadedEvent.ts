import {
    EventType,
    IEvent,
    IEventType,
} from "../../../../engine/event/EventType";
import { EngineMesh } from "../../../../engine/renderer/EngineMesh";

/**
 * Type: MeshLoadedEvent
 * NameSpace: Module.MeshLoaded
 * Type: Event
 */
export const MESH_LOADED_EVENT = new EventType(
    "Module.MeshLoaded.MESH_LOADED_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = MESH_LOADED_EVENT;
    public data?: MeshLoadedEventData;
}
const instanceOfEvent = new EventClass();
export const createMeshLoadedEvent = (data: MeshLoadedEventData): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface MeshLoadedEventData {
    entityId: number;
    mesh: EngineMesh;
}
