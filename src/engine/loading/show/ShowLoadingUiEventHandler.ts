import { EventType } from "../../event/EventType";
import { IEventHandler } from "../../event/IEventService";
import { Inject } from "../../ioc/Create";
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
