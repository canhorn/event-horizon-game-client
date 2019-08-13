import { Mesh, Vector3 } from "babylonjs";
import { IEventService } from "../../../../engine/event/IEventService";
import { Inject } from "../../../../engine/ioc/Create";
import { LifeCycleModule } from "../../../../engine/module/model/LifeCycleModule";
import { IRenderingScene } from "../../../../engine/renderer/api/IRenderingScene";
import { MAP_MESH_READY_EVENT } from "../../../entity/map/ready/MapMeshReadyEvent";
import { IHeightResolver } from "../../../systems/height/api/IHeightResolver";
import { IMeshModule } from "../api/IMeshModule";
import { IMeshSettings } from "../api/IMeshSettings";

export class MeshModule extends LifeCycleModule implements IMeshModule {
    private _mesh!: Mesh;

    public get mesh(): Mesh {
        return this._mesh;
    }

    constructor(
        private _startingPosition: Vector3,
        private _meshSettings?: IMeshSettings,
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _renderingScene: IRenderingScene = Inject(
            IRenderingScene
        ),
        private readonly _heightResolver: IHeightResolver = Inject(
            IHeightResolver
        )
    ) {
        super();
        this._eventService.addEventListener(
            MAP_MESH_READY_EVENT,
            this.onMapMeshReady,
            this
        );
        this.initializeMesh();
    }
    public update(): void {}
    public dispose(): void {
        this._eventService.addEventListener(
            MAP_MESH_READY_EVENT,
            this.onMapMeshReady,
            this
        );
        this._mesh.dispose();
    }

    private initializeMesh() {
        // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
        this._mesh = this.buildMesh();
        this._mesh.position.x = this._startingPosition.x;
        this._mesh.position.z = this._startingPosition.z;
        this._mesh.position.y = this._heightResolver.findHeight(
            this._startingPosition.x,
            this._startingPosition.z
        );
    }
    private onMapMeshReady() {
        this._mesh.position.y = this._heightResolver.findHeight(
            this._startingPosition.x,
            this._startingPosition.z
        );
    }
    private buildMesh(): Mesh {
        if (this._meshSettings) {
            return this._meshSettings.mesh;
        }
        // Default mesh
        return Mesh.CreateSphere(
            "testing_sphere1",
            8,
            1,
            this._renderingScene.scene
        );
    }
}
