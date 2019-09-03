import { ICommandService } from "../../../../core/command";
import { IEventService } from "../../../../core/event";
import { II18nMap } from "../../../../core/i18n/model/II18nMap";
import { ILogger } from "../../../../core/logger";
import { IQueryService } from "../../../../core/query";
import { IEngineRenderingAPI } from "../../../renderer/api/IEngineRenderingAPI";

export abstract class IScriptServices {
    public abstract logger: ILogger;
    public abstract i18n: II18nMap;
    public abstract eventService: IEventService;
    public abstract commandService: ICommandService;
    public abstract queryService: IQueryService;
    public abstract renderingApi: IEngineRenderingAPI;
}
