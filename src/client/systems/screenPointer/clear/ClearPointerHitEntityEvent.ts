import { EventType, IEvent } from "../../../../engine/event/EventType";

export const CLEAR_POINTER_HIT_ENTITY_EVENT: EventType = new EventType(
    "CLEAR_POINTER_HIT_ENTITY_EVENT"
);
export const clearPointerHitEntityEvent: IEvent = {
    type: CLEAR_POINTER_HIT_ENTITY_EVENT,
};
