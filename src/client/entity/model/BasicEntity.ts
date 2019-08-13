import { Vector3 } from "babylonjs";
import { Dictionary } from "../../../core/collection/Dictionary";
import { IDictionary } from "../../../core/collection/IDictionary";
import { isObjectDefined } from "../../../core/object/ObjectCheck";
import { Entity } from "../../../engine/entity/model/Entity";
import { IModule } from "../../../engine/module/IModule";
import { IObjectEntity } from "../api/IObjectEntity";
import { IObjectEntityDetails } from "../api/IObjectEntityDetails";
import { positionFromDetails } from "../position/PositionFromDetails";
import { createIdTag } from "../tracked/tagTypes/CreateIdTag";
import { createTypeTag } from "../tracked/tagTypes/CreateTypeTag";

export abstract class BasicEntity extends Entity implements IObjectEntity {
    get tags(): string[] {
        return this._tags;
    }
    public get globalId(): string {
        return this.getProperty("globalId");
    }

    public entityId: number;
    public type: string = "basic_entity";
    public position: Vector3;
    public details: IObjectEntityDetails;
    protected _propertyMap: IDictionary<string, any> = new Dictionary();
    protected _moduleMap: IDictionary<string, IModule> = new Dictionary();
    protected _tags: string[] = [];

    constructor(details: IObjectEntityDetails) {
        super();
        this.entityId = details.id;
        this.details = details;
        this._tags.push(createTypeTag("basic_entity"));
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

    public update(): void {
        const modules = this._moduleMap.values();
        const len = modules.length;
        for (let i = 0; i < len; i++) {
            modules[i].update();
        }
        this.onUpdate();
    }
    public dispose(): void {
        this._moduleMap.forEach((_, module) => module.dispose());
    }

    public abstract onDispose(): void;
    public abstract onUpdate(): void;
}
