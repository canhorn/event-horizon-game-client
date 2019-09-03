import { Vector3 } from "babylonjs";
import { EventType, IEvent } from "../../../../core/event";

export const POINTER_HIT_MESH_EVENT: EventType = new EventType(
    "POINTER_HIT_MESH_EVENT"
);
const pointerHitMeshEvent: IEvent = {
    type: POINTER_HIT_MESH_EVENT,
};
export const createPointerHitMeshEvent = (data: PointerHitMeshEventData) => {
    pointerHitMeshEvent.data = data;
    return pointerHitMeshEvent;
};
export interface PointerHitMeshEventData {
    meshName: string;
    position: Vector3;
}
