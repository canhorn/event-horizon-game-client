import { Mesh, Vector3 } from "babylonjs";
import { IEventService } from "../../../../core/event";
import { Inject } from "../../../../core/ioc";
import { IInitializable } from "../../../../engine/lifecycle/IInitializable";
import { IRegisterInitializable } from "../../../../engine/lifecycle/register/IRegisterInitializable";
import { LifeCycleModule } from "../../../../engine/module/model/LifeCycleModule";
import { IRenderingScene } from "../../../../engine/renderer/api/IRenderingScene";
import {
    convertToEngineMesh,
    EngineMesh,
} from "../../../../engine/renderer/EngineMesh";
import { IObjectEntity } from "../../../entity/api/IObjectEntity";
import { MAP_MESH_READY_EVENT } from "../../../entity/map/ready/MapMeshReadyEvent";
import { IHeightResolver } from "../../../systems/height/api/IHeightResolver";
import { ENTITY_ENTERING_VIEW_EVENT } from "../../inView/entering/EntityEnteringViewEvent";
import { ENTITY_EXITING_VIEW_EVENT } from "../../inView/exiting/EntityExitingViewEvent";
import {
    MESH_LOADED_EVENT,
    MeshLoadedEventData,
} from "../../modelLoader/loaded/MeshLoadedEvent";
import { IMeshModule } from "../api/IMeshModule";
import { createMeshSetEvent } from "../set/MeshSetEvent";

export class EntityMeshModule extends LifeCycleModule
    implements IMeshModule, IInitializable {
    private _mesh!: EngineMesh;
    private _startingPosition: Vector3;

    public get mesh(): EngineMesh {
        return this._mesh;
    }
    public set mesh(mesh: EngineMesh) {
        this._mesh = mesh;
    }
    constructor(
        private readonly _entity: IObjectEntity,
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _renderingScene: IRenderingScene = Inject(
            IRenderingScene
        ),
        private readonly _registerInitializable: IRegisterInitializable = Inject(
            IRegisterInitializable
        ),
        private readonly _heightResolver: IHeightResolver = Inject(
            IHeightResolver
        )
    ) {
        super();
        this._startingPosition = this._entity.position;
        this._eventService.on(MAP_MESH_READY_EVENT, this.onMapMeshReady, this);
        this._eventService.on(MESH_LOADED_EVENT, this.onMeshLoaded, this);
        this._eventService.on(
            ENTITY_ENTERING_VIEW_EVENT,
            this.onEnteringView,
            this
        );
        this._eventService.on(
            ENTITY_EXITING_VIEW_EVENT,
            this.onExitingView,
            this
        );
        this._registerInitializable.register(this);
    }
    public initialize(): void {
        this.initMesh();
    }
    public postInitialize(): void {}
    public dispose(): void {
        this._eventService.off(MAP_MESH_READY_EVENT, this.onMapMeshReady, this);
        this._eventService.off(MESH_LOADED_EVENT, this.onMeshLoaded, this);
        this._eventService.off(
            ENTITY_ENTERING_VIEW_EVENT,
            this.onEnteringView,
            this
        );
        this._eventService.off(
            ENTITY_EXITING_VIEW_EVENT,
            this.onExitingView,
            this
        );
        this._mesh.dispose();
    }
    public update(): void {
        this._entity.position = this._mesh.position;
    }

    private initMesh() {
        // Build default mesh
        this._mesh = this.buildLoadingMesh();
        this._mesh.setEnabled(false);
    }
    private onMapMeshReady() {
        this._mesh.position.x = this._startingPosition.x;
        this._mesh.position.z = this._startingPosition.z;
        this._mesh.position.y = this._heightResolver.findHeight(
            this._startingPosition.x,
            this._startingPosition.z
        );
    }
    private onMeshLoaded({ entityId, mesh }: MeshLoadedEventData) {
        if (this._entity.id !== entityId) {
            return;
        }
        this._mesh.dispose();
        this._mesh = mesh;
        this.onMapMeshReady();
        this._mesh.setEnabled(true);
        this._eventService.publish(createMeshSetEvent({ id: this._entity.id }));
    }
    private buildLoadingMesh(): EngineMesh {
        // Default mesh
        return convertToEngineMesh(
            Mesh.CreateSphere(
                `default_mesh_${this._entity.id}`,
                4,
                1,
                this._renderingScene.scene
            )
        );
    }
    private onEnteringView(entityId: number) {
        if (this._entity.id !== entityId) {
            return;
        }
        this.mesh.setEnabled(true);
    }
    private onExitingView(entityId: number) {
        if (this._entity.id !== entityId) {
            return;
        }
        this.mesh.setEnabled(false);
    }
}
