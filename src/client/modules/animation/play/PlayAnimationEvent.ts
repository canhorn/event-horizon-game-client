import { EventType, IEvent } from "../../../../core/event";

export const PLAY_ANIMATION_EVENT: EventType = new EventType(
    "PLAY_ANIMATION_EVENT"
);
const playAnimationEvent: IEvent = {
    type: PLAY_ANIMATION_EVENT,
};
export const createPlayAnimationEvent = (
    data: PlayAnimationEventData
): IEvent => {
    playAnimationEvent.data = data;
    return playAnimationEvent;
};
export interface PlayAnimationEventData {
    entityId: number;
    animation: string;
}
