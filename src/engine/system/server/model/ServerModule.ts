import { Inject } from "../../../../core/ioc";
import { createLogger, ILogger } from "../../../../core/logger";
import { Entity } from "../../../entity/model/Entity";
import { IRegisterDisposable } from "../../../lifecycle/register/IRegisterDisposable";
import { IRegisterInitializable } from "../../../lifecycle/register/IRegisterInitializable";
import { IRegisterUpdatable } from "../../../lifecycle/register/IRegisterUpdatable";
import { createClientScriptFromTemplate } from "../../client/scripts/create/CreateScriptFromTemplate";
import { IServerModule } from "../api/IServerModule";
import { IServerModuleScripts } from "../api/IServerModuleScripts";
import { IServerScript } from "../api/IServerScript";

export class ServerModule extends Entity implements IServerModule {
    private _initializeScript!: IServerScript;
    private _disposeScript!: IServerScript;
    private _updateScript!: IServerScript;

    private _data: any = {};

    constructor(
        private scripts: IServerModuleScripts,
        private readonly _logger: ILogger = createLogger(
            "ServerModule_" + scripts.name
        ),
        private readonly _registerDisposable: IRegisterDisposable = Inject(
            IRegisterDisposable
        ),
        private readonly _registerInitializable: IRegisterInitializable = Inject(
            IRegisterInitializable
        ),
        private readonly _registerUpdatable: IRegisterUpdatable = Inject(
            IRegisterUpdatable
        )
    ) {
        super();
        this._registerInitializable.register(this);
        this._registerDisposable.register(this);
    }

    public initialize(): void {
        // Create Initialize Script
        this._initializeScript = createClientScriptFromTemplate(
            `ServerModule_${this.scripts.name}_Initialize`,
            this.scripts.initializeScript
        );
        // Create Dispose Script
        this._disposeScript = createClientScriptFromTemplate(
            `ServerModule_${this.scripts.name}_Dispose`,
            this.scripts.disposeScript
        );
        // Create Update Script
        this._updateScript = createClientScriptFromTemplate(
            `ServerModule_${this.scripts.name}_Update`,
            this.scripts.updateScript
        );

        // Run Initialize Script
        if (this._initializeScript.isRunnable) {
            this._initializeScript.run(this._data);
        }
    }
    public postInitialize(): void {
        if (this._updateScript.isRunnable) {
            this._registerUpdatable.register(this);
        }
    }
    public dispose(): void {
        if (this._disposeScript.isRunnable) {
            this._disposeScript.run(this._data);
        }
    }
    public update(): void {
        this._updateScript.run(this._data);
    }
}
