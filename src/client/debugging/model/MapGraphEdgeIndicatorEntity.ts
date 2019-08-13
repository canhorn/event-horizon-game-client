import { AbstractMesh, MeshBuilder, Vector3 } from "babylonjs";
import { Entity } from "../../../engine/entity/model/Entity";
import { IEventService } from "../../../engine/event/IEventService";
import { Inject } from "../../../engine/ioc/Create";
import { IDisposable } from "../../../engine/lifecycle/IDisposable";
import { IInitializable } from "../../../engine/lifecycle/IInitializable";
import { IRegisterDisposable } from "../../../engine/lifecycle/register/IRegisterDisposable";
import { IRegisterInitializable } from "../../../engine/lifecycle/register/IRegisterInitializable";
import { IGuid } from "../../../engine/math/guid/IGuid";
import { ServerVector3Mapper } from "../../../engine/math/ServerVectors";
import { IRenderingScene } from "../../../engine/renderer/api/IRenderingScene";
import { MAP_MESH_READY_EVENT } from "../../entity/map/ready/MapMeshReadyEvent";
import { IHeightResolver } from "../../systems/height/api/IHeightResolver";
import { IMapGraph } from "../../systems/map/api/IMapGraph";
import { IMapNode } from "../../systems/map/api/IMapNode";

export class MapGraphEdgeIndicatorEntity extends Entity
    implements IInitializable, IDisposable {
    private _meshOfNavGraph: AbstractMesh[] = [];
    constructor(
        private _mapGraph: IMapGraph,
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _registerInitializable: IRegisterInitializable = Inject(
            IRegisterInitializable
        ),
        private readonly _registerDisposable: IRegisterDisposable = Inject(
            IRegisterDisposable
        ),
        private readonly _guid: IGuid = Inject(IGuid),
        private readonly _renderingScene: IRenderingScene = Inject(
            IRenderingScene
        ),
        private readonly _heightResolver: IHeightResolver = Inject(
            IHeightResolver
        )
    ) {
        super();
        _registerDisposable.register(this);
        _eventService.addEventListener(
            MAP_MESH_READY_EVENT,
            this.onMapMeshReady,
            this
        );
    }
    public initialize(): void {}
    public postInitialize(): void {
        const debugNavGraph: AbstractMesh[] = [];
        const edgeLines: Vector3[][] = [];
        this._mapGraph.edgeList.forEach(edge => {
            const toNode = this.getNode(edge.toIndex);
            const fromNode = this.getNode(edge.fromIndex);
            if (!toNode || !fromNode) {
                return;
            }

            let fromIndex = ServerVector3Mapper.mapToVector3(fromNode.position);
            fromIndex = fromIndex.add(
                new Vector3(
                    0,
                    this._heightResolver.findHeight(fromIndex.x, fromIndex.z) +
                        0.1,
                    0
                )
            );
            let toIndex = ServerVector3Mapper.mapToVector3(toNode.position);
            toIndex = toIndex.add(
                new Vector3(
                    0,
                    this._heightResolver.findHeight(toIndex.x, toIndex.z) + 0.1,
                    0
                )
            );
            edgeLines.push([fromIndex, toIndex]);
        });

        const edgeLineSystem = MeshBuilder.CreateLineSystem(
            "lineSystem",
            {
                lines: edgeLines,
                updatable: false,
                instance: null,
            },
            this._renderingScene.scene
        );
        edgeLineSystem.isPickable = false;
        debugNavGraph.push(edgeLineSystem);
        this._meshOfNavGraph = debugNavGraph;
    }
    public dispose(): void {
        this._registerDisposable.unregister(this);
        this._meshOfNavGraph.forEach(mesh => mesh.dispose());
        this._eventService.addEventListener(
            MAP_MESH_READY_EVENT,
            this.onMapMeshReady,
            this
        );
    }

    private onMapMeshReady() {
        this._meshOfNavGraph.forEach(mesh => mesh.dispose());
        this.postInitialize();
    }

    private getNode(nodeIndex: number): IMapNode | undefined {
        for (let index = 0; index < this._mapGraph.nodeList.length; index++) {
            const node = this._mapGraph.nodeList[index];
            if (node.index === nodeIndex) {
                return node;
            }
        }
        return undefined;
    }
}
