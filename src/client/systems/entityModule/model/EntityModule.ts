import { LifeCycleModule } from "../../../../engine/module/model/LifeCycleModule";
import { IClientScript } from "../../../../engine/system/client/scripts/api/IClientScript";
import { createClientScriptFromTemplate } from "../../../../engine/system/client/scripts/create/CreateScriptFromTemplate";
import { IObjectEntity } from "../../../entity/api/IObjectEntity";
import { IEntityModule } from "../api/IEntityModule";
import { IEntityModuleData } from "../api/IEntityModuleData";
import { IEntityScriptModule } from "../api/IEntityScriptModule";

export class EntityModule extends LifeCycleModule implements IEntityModule {
    private _initializeScript: IClientScript;
    private _disposeScript: IClientScript;
    private _updateScript: IClientScript;
    private _data: IEntityModuleData;
    private _moduleName: string;

    get moduleName(): string {
        return this._moduleName;
    }
    get id(): number {
        return this._entity.id;
    }

    constructor(
        private readonly _entity: IObjectEntity,
        entityScriptModule: IEntityScriptModule
    ) {
        super();
        this._data = {
            $entity: _entity,
        };
        this._moduleName = entityScriptModule.name;
        this._initializeScript = createClientScriptFromTemplate(
            `${_entity.entityId}-${entityScriptModule.name}-Initialize`,
            entityScriptModule.initializeScriptName
        );
        this._disposeScript = createClientScriptFromTemplate(
            `${_entity.entityId}-${entityScriptModule.name}-Dispose`,
            entityScriptModule.disposeScriptName
        );
        this._updateScript = createClientScriptFromTemplate(
            `${_entity.entityId}-${entityScriptModule.name}-Update`,
            entityScriptModule.updateScriptName
        );
        if (this._initializeScript.isRunnable) {
            this._initializeScript.run(this._data);
        }
    }
    public dispose(): void {
        if (this._disposeScript.isRunnable) {
            this._disposeScript.run(this._data);
        }
    }
    public update(): void {
        if (this._updateScript.isRunnable) {
            this._updateScript.run(this._data);
        }
    }
}
