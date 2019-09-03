import { EventType, IEvent, IEventType } from "../../../core/event";
/**
 * Type: PlayerActionEvent
 * NameSpace: Player
 * Type: Event
 */
export const PLAYER_ACTION_EVENT = new EventType("Player.PLAYER_ACTION_EVENT");
class EventClass implements IEvent {
    public type: IEventType = PLAYER_ACTION_EVENT;
    public data?: PlayerActionEventData;
}
const instanceOfEvent = new EventClass();
export const createPlayerActionEvent = (
    data: PlayerActionEventData
): IEvent => {
    instanceOfEvent.data = data;
    return instanceOfEvent;
};
export interface PlayerActionEventData {
    action: string;
    data?: any;
}
