import { ICommandService } from "../../../command/api/ICommandService";
import { IEventService } from "../../../event/IEventService";
import { getI18nState } from "../../../i18n/store/I18nStore";
import { Inject } from "../../../ioc/Create";
import { Container } from "../../../ioc/typescript-ioc";
import { createLogger } from "../../../logger/InjectLoggerDecorator";
import { ILogger } from "../../../logger/LoggerFactory";
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
    get renderingApi() {
        return Inject<IEngineRenderingAPI>(IEngineRenderingAPI);
    }
}
