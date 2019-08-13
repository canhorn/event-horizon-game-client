import { EventType, IEvent } from "../../event/EventType";

export const GAME_LOADED_EVENT = new EventType("ENGINE.GAME_LOADED");

export const gameLoadedEvent: IEvent = {
    type: GAME_LOADED_EVENT,
};
