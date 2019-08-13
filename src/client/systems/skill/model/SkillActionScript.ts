import { Inject } from "../../../../engine/ioc/Create";
import { ILoggerFactory } from "../../../../engine/logger/LoggerFactory";
import { ISkillActionScriptServices } from "../api/ISkillActionScriptServices";
import { ISkillActionScriptUtils } from "../api/ISkillActionScriptUtils";
import { buildSkillActionScriptServices } from "../services/SkillActionScriptServices";
import { buildSkillActionScriptUtils } from "../utils/SkillActionScriptUtils";

export class SkillActionScripts {
    private readonly _runner: ISkillActionScriptRunner;
    private readonly _services: ISkillActionScriptServices;
    private readonly _utils: ISkillActionScriptUtils;

    get id() {
        return this._id;
    }

    constructor(
        private readonly _id: string,
        scriptString: string,
        loggerFactory: ILoggerFactory = Inject(ILoggerFactory)
    ) {
        this._runner = new Function(
            "$services",
            "$utils",
            "$data",
            scriptString
        ) as ISkillActionScriptRunner;
        this._services = buildSkillActionScriptServices(
            loggerFactory.create(`SkillActionScript (${_id})`)
        );
        this._utils = buildSkillActionScriptUtils();
    }

    public run(data: any): void {
        this._runner(this._services, this._utils, data);
    }
}

type ISkillActionScriptRunner = (
    services: ISkillActionScriptServices,
    utils: ISkillActionScriptUtils,
    data: any
) => void;
