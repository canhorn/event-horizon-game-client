import { Inject } from "../../../../core/ioc";
import { ILogger } from "../../../../core/logger";
import { isObjectDefined } from "../../../../core/object/ObjectCheck";
import { IScriptServices } from "../../script/api/IScriptServices";
import { IScriptUtils } from "../../script/api/IScriptUtils";
import { IServerScript } from "../api/IServerScript";

export class ServerScript implements IServerScript {
    private _utils!: IScriptUtils;
    private _services!: IScriptServices;

    private _scriptString: string;
    private _runner!: IServerScriptRunner;

    get isRunnable(): boolean {
        return isObjectDefined(this._runner);
    }

    /**
     * The internal state of the script, so on multiple calls to run it can get prior state of past runs.
     *
     * @private
     * @memberof ServerScript
     */
    private _state = {};

    constructor(
        private readonly _logger: ILogger,
        scriptString: string,
        scriptUtils: IScriptUtils = Inject(IScriptUtils),
        scriptServices: IScriptServices = Inject(IScriptServices)
    ) {
        this._scriptString = scriptString;
        if (this._scriptString) {
            this._utils = scriptUtils;
            this._services = scriptServices;
            this._runner = new Function(
                // Framework provided functionality.
                "$services",
                // Provided a collection of useful functions to the script.
                "$utils",
                // Internal data, that can be used between run calls.
                "$state",
                // External passed in properties, should not me modified
                "$data",
                this._scriptString
            ) as IServerScriptRunner;
        }
    }

    /**
     *
     * @param data Allow for passing of state between scripts
     */
    public run<T>(data: any): T {
        return this._runner(this._services, this._utils, this._state, data);
    }
}

type IServerScriptRunner = (
    services: IScriptServices,
    utils: IScriptUtils,
    state: any,
    data: any
) => any;
