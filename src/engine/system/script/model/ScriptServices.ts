import { ICommandService } from "../../../../core/command";
import { IEventService } from "../../../../core/event";
import { getI18nState } from "../../../../core/i18n/store/I18nStore";
import { Container, Inject } from "../../../../core/ioc";
import { createLogger, ILogger } from "../../../../core/logger";
import { IQueryService } from "../../../../core/query/api/IQueryService";
import { IEngineRenderingAPI } from "../../../renderer/api/IEngineRenderingAPI";
import { IScriptServices } from "../api/IScriptServices";

export class ScriptServices implements IScriptServices {
    constructor(private _logger: ILogger = createLogger("ScriptServices")) {}
    get logger() {
        return this._logger;
    }
    get i18n() {
        return getI18nState();
    }
    get eventService() {
        return Container.get(IEventService);
    }
    get commandService() {
        return Container.get(ICommandService);
    }
    get queryService() {
        return Container.get(IQueryService);
    }
    get renderingApi() {
        return Inject<IEngineRenderingAPI>(IEngineRenderingAPI);
    }
}
