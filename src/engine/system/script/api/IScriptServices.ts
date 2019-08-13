import { ICommandService } from "../../../command/api/ICommandService";
import { IEventService } from "../../../event/IEventService";
import { II18nMap } from "../../../i18n/model/II18nMap";
import { ILogger } from "../../../logger/LoggerFactory";
import { IEngineRenderingAPI } from "../../../renderer/api/IEngineRenderingAPI";

export abstract class IScriptServices {
    public abstract logger: ILogger;
    public abstract i18n: II18nMap;
    public abstract eventService: IEventService;
    public abstract commandService: ICommandService;
    public abstract renderingApi: IEngineRenderingAPI;
}
