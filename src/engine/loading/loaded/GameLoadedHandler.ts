import { IEventHandler } from "../../event/IEventService";
import { Inject } from "../../ioc/Create";
import { IRenderingEngine } from "../../renderer/api/IRenderingEngine";
import { EventType } from "./../../event/EventType";
import { GAME_LOADED_EVENT } from "./GameLoadedEvent";

export class GameLoadedHandler implements IEventHandler {
    public type: EventType = GAME_LOADED_EVENT;

    constructor(
        private readonly _renderingEngine: IRenderingEngine = Inject(
            IRenderingEngine
        )
    ) {}

    public handle() {
        this._renderingEngine.engine.hideLoadingUI();
    }
}
