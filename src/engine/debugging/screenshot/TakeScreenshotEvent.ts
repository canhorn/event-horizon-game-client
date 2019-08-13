import { EventType, IEvent } from "../../event/EventType";

export const TAKE_SCREENSHOT_EVENT = new EventType(
    "Debugging.TAKE_SCREENSHOT_EVENT"
);

export const takeScreenshotEvent: IEvent = {
    type: TAKE_SCREENSHOT_EVENT,
};
