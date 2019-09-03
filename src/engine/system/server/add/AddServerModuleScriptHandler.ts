import {
    EventType,
    IEventHandler,
    IEventService,
} from "../../../../core/event";
import { Inject } from "../../../../core/ioc";
import { createLogger, ILogger } from "../../../../core/logger";
import { IServerModuleScripts } from "../api/IServerModuleScripts";
import { ServerModule } from "../model/ServerModule";
import { ADD_SERVER_MODULE_SCRIPT_EVENT } from "./AddServerModuleScriptEvent";

export class AddServerModuleScriptHandler implements IEventHandler {
    public type: EventType = ADD_SERVER_MODULE_SCRIPT_EVENT;

    constructor(
        private readonly _logger: ILogger = createLogger(
            "AddServerModuleScriptHandler"
        ),
        private readonly _eventService: IEventService = Inject(IEventService)
    ) {}

    public handle(scripts: IServerModuleScripts) {
        this._logger.debug("ServerModule Scripts", scripts);
        new ServerModule(scripts);
    }
}
