import { AnimationGroup } from "babylonjs";
import { EventType, IEvent } from "../../../../core/event";

export const ANIMATION_LIST_LOADED_EVENT: EventType = new EventType(
    "ANIMATION_LIST_LOADED_EVENT"
);
const animationListLoadedEvent: IEvent = {
    type: ANIMATION_LIST_LOADED_EVENT,
};
export const createAnimationListLoadedEvent = (
    data: AnimationLoadedEventData
): IEvent => {
    animationListLoadedEvent.data = data;
    return animationListLoadedEvent;
};
export interface AnimationLoadedEventData {
    entityId: number;
    animationList: AnimationGroup[];
}
