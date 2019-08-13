import { EventType, IEvent } from "../../event/EventType";

export const CANVAS_INITIALIZED = new EventType("canvas.CANVAS_INITIALIZED");
export const canvasInitialized: IEvent = {
    type: CANVAS_INITIALIZED,
};
