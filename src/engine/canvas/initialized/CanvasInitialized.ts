import { EventType, IEvent } from "../../../core/event";

export const CANVAS_INITIALIZED = new EventType("canvas.CANVAS_INITIALIZED");
export const canvasInitialized: IEvent = {
    type: CANVAS_INITIALIZED,
};
