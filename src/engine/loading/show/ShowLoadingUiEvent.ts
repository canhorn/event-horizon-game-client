import { EventType, IEvent, IEventType } from "../../event/EventType";

/**
 * Type: ShowLoadingUiEvent
 * NameSpace: Loading
 * Type: Event
 */
export const SHOW_LOADING_UI_EVENT = new EventType(
    "Loading.SHOW_LOADING_UI_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = SHOW_LOADING_UI_EVENT;
    public data?: ShowLoadingUiEventData;
}
const instanceOfEvent = new EventClass();
export const createShowLoadingUiEvent = (
    data: ShowLoadingUiEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface ShowLoadingUiEventData {}
