import { EventType, IEvent, IEventType } from "../../../../core/event";

/**
 * Name: RunInteractionEvent
 * NameSpace: Editor.Module.Interaction
 * Type: Event
 */
export const RUN_INTERACTION_EVENT = new EventType(
    "Editor.Module.Interaction.RUN_INTERACTION_EVENT"
);
class EventClass implements IEvent {
    public type: IEventType = RUN_INTERACTION_EVENT;
    public data?: RunInteractionEventData;
}
const instanceOfEvent = new EventClass();
export const createRunInteractionEvent = (
    data: RunInteractionEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface RunInteractionEventData {}
