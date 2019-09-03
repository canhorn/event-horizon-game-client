import { EventType, IEvent, IEventType } from "../../../../core/event";

/**
 * Name: ShowInteractionIndicatorEvent
 * NameSpace: Client.Modules.InteractiveIndicator
 * Type: Event
 */
export const SHOW_INTERACTION_INDICATOR_EVENT = new EventType(
    "Client.Modules.InteractiveIndicator.SHOW_INTERACTION_INDICATOR_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = SHOW_INTERACTION_INDICATOR_EVENT;
    public data?: ShowInteractionIndicatorEventData;
}
const instanceOfEvent = new EventClass();
export const createShowInteractionIndicatorEvent = (
    data: ShowInteractionIndicatorEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface ShowInteractionIndicatorEventData {
    entityId: number;
}
