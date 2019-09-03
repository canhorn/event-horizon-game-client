import { EventType, IEvent, IEventType } from "../../../../../core/event";
/**
 * Type: SetCameraToFreeEvent
 * NameSpace: Player.Camera
 * Type: Event
 */
export const SET_CAMERA_TO_FREE_EVENT = new EventType(
    "Player.Camera.SET_CAMERA_TO_FREE_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = SET_CAMERA_TO_FREE_EVENT;
    public data?: SetCameraToFreeEventData;
}
const instanceOfEvent = new EventClass();
export const createSetCameraToFreeEvent = (
    data: SetCameraToFreeEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface SetCameraToFreeEventData {}
