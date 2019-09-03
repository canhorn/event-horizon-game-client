import { EventType, IEventHandler } from "../../../core/event";
import { Inject } from "../../../core/ioc";
import { IRenderingEngine } from "../../renderer/api/IRenderingEngine";
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
