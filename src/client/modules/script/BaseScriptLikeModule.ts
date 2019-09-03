import { Inject } from "../../../core/ioc/api/Inject";
import { ILogger } from "../../../core/logger/api/ILogger";
import { createLogger } from "../../../core/logger/create/CreateLogger";
import { LifeCycleModule } from "../../../engine/module/model/LifeCycleModule";
import { IScriptServices } from "../../../engine/system/script/api/IScriptServices";
import { IScriptUtils } from "../../../engine/system/script/api/IScriptUtils";
import { IObjectEntity } from "../../entity/api/IObjectEntity";

export abstract class BaseScriptLikeModule extends LifeCycleModule {
    private _state: any;
    private _data: any;
    constructor(
        _entity: IObjectEntity,
        private readonly _scriptService: IScriptServices = Inject(
            IScriptServices
        ),
        private readonly _scriptUtils: IScriptUtils = Inject(IScriptUtils),
        private readonly _logger: ILogger = createLogger("SandboxModule")
    ) {
        super();
        this._state = {};
        this._data = { $entity: _entity };
        this.initialize();
    }
    public abstract onUpdate(props: IBaseScriptModuleProperties): void;
    public abstract onDispose(props: IBaseScriptModuleProperties): void;
    public abstract onInitialize(props: IBaseScriptModuleProperties): void;
    public update(): void {
        this.onUpdate({
            $services: this._scriptService,
            $utils: this._scriptUtils,
            $state: this._state,
            $data: this._data,
        });
    }
    public dispose(): void {
        this.onDispose({
            $services: this._scriptService,
            $utils: this._scriptUtils,
            $state: this._state,
            $data: this._data,
        });
    }
    private initialize() {
        this.onInitialize({
            $services: this._scriptService,
            $utils: this._scriptUtils,
            $state: this._state,
            $data: this._data,
        });
    }
}
export interface IBaseScriptModuleProperties {
    // Framework provided functionality.
    $services: IScriptServices;
    // Provided a collection of useful functions to the script.
    $utils: IScriptUtils;
    // Internal data, that can be used between run calls.
    $state: any;
    // External passed in properties, should not me modified
    $data: any;
}
