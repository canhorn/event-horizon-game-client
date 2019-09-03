import { EventType, IEvent } from "../../../core/event";

export const CANVAS_RESET_DONE = new EventType("canvas.CANVAS_RESET_DONE");
export const canvasResetDone: IEvent = {
    type: CANVAS_RESET_DONE,
};
