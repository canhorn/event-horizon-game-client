import { EventType, IEvent } from "../../event/EventType";

export const CANVAS_RESET = new EventType("canvas.CANVAS_RESET");
export const canvasReset: IEvent = {
    type: CANVAS_RESET,
};
