import { EventType, IEventHandler } from "../../../core/event";
import { Inject } from "../../../core/ioc";
import { IRenderingEngine } from "../../renderer/api/IRenderingEngine";
import { SHOW_LOADING_UI_EVENT } from "./ShowLoadingUiEvent";

export class ShowLoadingUiEventHandler implements IEventHandler {
    public type: EventType = SHOW_LOADING_UI_EVENT;

    constructor(
        private readonly _renderingEngine: IRenderingEngine = Inject(
            IRenderingEngine
        )
    ) {}

    public handle() {
        this._renderingEngine.engine.displayLoadingUI();
    }
}
