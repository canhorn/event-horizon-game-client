import { EventType, IEvent } from "../../../core/event";

export const GAME_LOADED_EVENT = new EventType("ENGINE.GAME_LOADED");

export const gameLoadedEvent: IEvent = {
    type: GAME_LOADED_EVENT,
};
