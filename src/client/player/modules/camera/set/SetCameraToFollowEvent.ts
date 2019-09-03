import { EventType, IEvent, IEventType } from "../../../../../core/event";

/**
 * Type: SetCameraToFollowEvent
 * NameSpace: Player.Camera
 * Type: Event
 */
export const SET_CAMERA_TO_FOLLOW_EVENT = new EventType(
    "Player.Camera.SET_CAMERA_TO_FOLLOW_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = SET_CAMERA_TO_FOLLOW_EVENT;
    public data?: SetCameraToFollowEventData;
}
const instanceOfEvent = new EventClass();
export const createSetCameraToFollowEvent = (
    data: SetCameraToFollowEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface SetCameraToFollowEventData {}
