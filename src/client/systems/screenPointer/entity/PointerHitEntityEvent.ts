import { EventType, IEvent } from "../../../../engine/event/EventType";

export const POINTER_HIT_ENTITY_EVENT: EventType = new EventType(
    "POINTER_HIT_ENTITY_EVENT"
);
const pointerHitEntityEvent: IEvent = {
    type: POINTER_HIT_ENTITY_EVENT,
};
export const createPointerHitEntityEvent = (
    data: PointerHitEntityEventData
) => {
    pointerHitEntityEvent.data = data;
    return pointerHitEntityEvent;
};
export interface PointerHitEntityEventData {
    entityId: number;
}
