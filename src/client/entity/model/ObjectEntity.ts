import { Vector3 } from "babylonjs";
import { Dictionary } from "../../../core/collection/Dictionary";
import { IDictionary } from "../../../core/collection/IDictionary";
import { isObjectDefined } from "../../../core/object/ObjectCheck";
import { ICommandService } from "../../../engine/command/api/ICommandService";
import { Inject } from "../../../engine/ioc/Create";
import { IModule } from "../../../engine/module/IModule";
import { ANIMATION_MODULE_NAME } from "../../modules/animation/api/IAnimationModule";
import { AnimationModule } from "../../modules/animation/model/AnimationModule";
import { ANIMATION_ACTION_MODULE_NAME } from "../../modules/animationAction/api/IAnimationActionModule";
import { AnimationActionModule } from "../../modules/animationAction/model/AnimationActionModule";
import { DETAILS_MODULE_NAME } from "../../modules/details/api/IDetailsModule";
import { DetailsModule } from "../../modules/details/model/DetailsModule";
import { INTERACTION_MODULE_NAME } from "../../modules/interaction/api/IInteractionModule";
import InteractionModule from "../../modules/interaction/model/InteractionModule";
import { INTERACTION_INDICATOR_MODULE_NAME } from "../../modules/interactionIndicator/api/IInteractionIndicatorModule";
import InteractionIndicatorModule from "../../modules/interactionIndicator/model/InteractionIndicatorModule";
import { IN_VIEW_MODULE_NAME } from "../../modules/inView/api/IInViewModule";
import { InViewModule } from "../../modules/inView/model/InViewModule";
import { MESH_MODULE_NAME } from "../../modules/mesh/api/IMeshModule";
import { EntityMeshModule } from "../../modules/mesh/model/EntityMeshModule";
import { MODEL_LOADER_MODULE_NAME } from "../../modules/modelLoader/api/IModelLoaderModule";
import { ModelLoaderModule } from "../../modules/modelLoader/model/ModelLoaderModule";
import { MOVE_MODULE_NAME } from "../../modules/move/api/IMoveModule";
import { STOPPING_MODULE_NAME } from "../../modules/move/api/IStoppingModule";
import { EntityMoveModule } from "../../modules/move/model/EntityMoveModule";
import { EntityStoppingModule } from "../../modules/move/model/EntityStoppingModule";
import { SELECTED_INDICATOR_MODULE_NAME } from "../../modules/selectedIndicator/api/ISelectedIndicatorModule";
import SelectedIndicatorModule from "../../modules/selectedIndicator/model/SelectedIndicatorModule";
import { STATE_MODULE_NAME } from "../../modules/state/api/IStateModule";
import { StateModule } from "../../modules/state/model/StateModule";
import { createRegisterAllBaseModulesCommand } from "../../systems/entityModule/register/RegisterAllBaseModulesCommand";
import { IObjectEntity } from "../api/IObjectEntity";
import { IObjectEntityDetails } from "../api/IObjectEntityDetails";
import { positionFromDetails } from "../position/PositionFromDetails";
import { TrackedEntity } from "../tracked/model/TrackedEntity";
import { createIdTag } from "../tracked/tagTypes/CreateIdTag";
import { createTypeTag } from "../tracked/tagTypes/CreateTypeTag";

export class ObjectEntity extends TrackedEntity implements IObjectEntity {
    public get globalId(): string {
        return this.getProperty("globalId");
    }

    public entityId: number;
    public type: string = "BASE";
    public position: Vector3;
    public details: IObjectEntityDetails;
    protected _propertyMap: IDictionary<string, any> = new Dictionary();
    protected _moduleMap: IDictionary<string, IModule> = new Dictionary();

    constructor(
        details: IObjectEntityDetails,
        protected readonly _commandService: ICommandService = Inject(
            ICommandService
        )
    ) {
        super();
        this.entityId = details.id;
        this.details = details;
        this._tags.push(createTypeTag("base"));
        this._tags.push(createIdTag(this.entityId));
        this.position = positionFromDetails(this.details);
    }
    public equals(id: any): boolean {
        return this.entityId === id;
    }
    public getProperty<T>(name: string): T {
        if (this._propertyMap.containsKey(name)) {
            return this._propertyMap.getValue(name) as T;
        }
        if (this._moduleMap.containsKey(name)) {
            return (this._moduleMap.getValue(name) as any) as T;
        }
        if (isObjectDefined(this.details[name])) {
            return this.details[name];
        }
        return this.details.data[name];
    }
    public setProperty(name: string, property: any): void {
        this._propertyMap.setValue(name, property);
    }

    public registerModule(name: string, module: IModule): void {
        this._moduleMap.setValue(name, module);
    }

    public initialize(): void {
        this.registerModule(STATE_MODULE_NAME, new StateModule(this));
        this.registerModule(MESH_MODULE_NAME, new EntityMeshModule(this));
        this.registerModule(MOVE_MODULE_NAME, new EntityMoveModule(this));
        this.registerModule(
            STOPPING_MODULE_NAME,
            new EntityStoppingModule(this)
        );
        this.registerModule(DETAILS_MODULE_NAME, new DetailsModule(this));
        this.registerModule(
            SELECTED_INDICATOR_MODULE_NAME,
            new SelectedIndicatorModule(this)
        );
        this.registerModule(ANIMATION_MODULE_NAME, new AnimationModule(this));
        this.registerModule(
            ANIMATION_ACTION_MODULE_NAME,
            new AnimationActionModule(this)
        );
        this.registerModule(IN_VIEW_MODULE_NAME, new InViewModule(this));
        this.registerModule(
            INTERACTION_MODULE_NAME,
            new InteractionModule(this)
        );
        this.registerModule(
            INTERACTION_INDICATOR_MODULE_NAME,
            new InteractionIndicatorModule(this)
        );
        this._commandService.send(
            createRegisterAllBaseModulesCommand({
                entity: this,
            })
        );
        this.registerModule(
            MODEL_LOADER_MODULE_NAME,
            new ModelLoaderModule(this)
        );
    }
    public update(): void {
        const modules = this._moduleMap.values();
        const len = modules.length;
        for (let i = 0; i < len; i++) {
            modules[i].update();
        }
    }
    public onDispose(): void {
        this._moduleMap.forEach((_, module) => module.dispose());
    }
    public draw(): void {}
}
