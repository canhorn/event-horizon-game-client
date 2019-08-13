import {
    EventType,
    IEvent,
    IEventType,
} from "../../../../engine/event/EventType";

/**
 * Name: ClearInteractionIndicatorEvent
 * NameSpace: Client.Modules.InteractionIndicator
 * Type: Event
 */
export const CLEAR_INTERACTION_INDICATOR_EVENT = new EventType(
    "Client.Modules.InteractionIndicator.CLEAR_INTERACTION_INDICATOR_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = CLEAR_INTERACTION_INDICATOR_EVENT;
    public data?: ClearInteractionIndicatorEventData;
}
const instanceOfEvent = new EventClass();
export const createClearInteractionIndicatorEvent = (
    data: ClearInteractionIndicatorEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface ClearInteractionIndicatorEventData {}
