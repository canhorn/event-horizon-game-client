import { EventType, IEventType } from "../../../engine/event/EventType";

export const CLIENT_ACTION_ENTITY_STOPPING: string = "ClientEntityStopping";
export const CLIENT_ACTION_ENTITY_STOPPING_EVENT: IEventType = new EventType(
    CLIENT_ACTION_ENTITY_STOPPING
);
export interface ClientActionEntityStoppingEventData {
    entityId: number;
}
