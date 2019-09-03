import { Mesh, Vector3 } from "babylonjs";
import { IEventService } from "../../../../../core/event";
import { Inject } from "../../../../../core/ioc";
import { LifeCycleEntity } from "../../../../lifecycle/model/LifeCycleEntity";
import {
    EngineMesh,
    shadowAsEngineMesh,
} from "../../../../renderer/EngineMesh";
import { IClientAssetInstance } from "../api/IClientAssetInstance";

/**
 * This wraps a Rendering Mesh, creating a clone in the process.
 */
export class ClientAssetInstance extends LifeCycleEntity
    implements IClientAssetInstance {
    public _instancedMesh: Mesh;

    get assetInstanceId(): string {
        return this._assetInstanceId;
    }
    get mesh(): EngineMesh {
        return shadowAsEngineMesh(this._instancedMesh);
    }

    constructor(
        private readonly _assetInstanceId: string,
        mesh: Mesh,
        position: Vector3,
        private readonly _eventService: IEventService = Inject(IEventService)
    ) {
        super();
        this._instancedMesh = mesh.clone(`client_asset-${_assetInstanceId}`);
        this._instancedMesh.position = position;
    }
    public initialize(): void {
        this._instancedMesh.setEnabled(true);
    }
    public onDispose(): void {
        this._instancedMesh.dispose();
    }
    public update(): void {}
    public draw(): void {}
}
