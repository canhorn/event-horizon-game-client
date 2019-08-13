import { BoundingBoxGizmo, Mesh, Space, Vector3 } from "babylonjs";
import { SceneLoader } from "babylonjs-loaders";
import { ICommandService } from "../../../../engine/command/api/ICommandService";
import { IEventService } from "../../../../engine/event/IEventService";
import { Inject } from "../../../../engine/ioc/Create";
import { createLogger } from "../../../../engine/logger/InjectLoggerDecorator";
import { ILogger } from "../../../../engine/logger/LoggerFactory";
import { IGuid } from "../../../../engine/math/guid/IGuid";
import { LifeCycleModule } from "../../../../engine/module/model/LifeCycleModule";
import { IQueryService } from "../../../../engine/query/IQueryService";
import { IRenderingScene } from "../../../../engine/renderer/api/IRenderingScene";
import { convertToEngineMesh } from "../../../../engine/renderer/EngineMesh";
import { IGLTFMeshConfig } from "../../../../engine/system/client/assets/api/configs/IGLTFMeshConfig";
import { ISphereMeshConfig } from "../../../../engine/system/client/assets/api/configs/ISphereMeshConfig";
import { IClientAsset } from "../../../../engine/system/client/assets/api/IClientAsset";
import { createBuildClientAssetInstanceCommand } from "../../../../engine/system/client/assets/builder/BuildClientAssetInstanceCommand";
import { createFetchClientAssetQuery } from "../../../../engine/system/client/assets/fetch/FetchClientAssetQuery";
import {
    CLIENT_ASSET_INSTANCE_REGISTERED_EVENT,
    ClientAssetInstanceRegisteredEventData,
} from "../../../../engine/system/client/assets/register/ClientAssetInstanceRegisteredEvent";
import { IObjectEntity } from "../../../entity/api/IObjectEntity";
import { createAnimationListLoadedEvent } from "../../animation/listLoaded/AnimationListLoadedEvent";
import { createPlayAnimationEvent } from "../../animation/play/PlayAnimationEvent";
import { IModelLoaderModule } from "../api/IModelLoaderModule";
import { IModelState } from "../api/IModelState";
import { createMeshLoadedEvent } from "../loaded/MeshLoadedEvent";

export class ModelLoaderModule extends LifeCycleModule
    implements IModelLoaderModule {
    private _assetInstanceId: string;
    constructor(
        private readonly _entity: IObjectEntity,
        private readonly _logger: ILogger = createLogger("ModelLoaderModule"),
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _queryService: IQueryService = Inject(IQueryService),
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        ),
        private readonly _renderingScene: IRenderingScene = Inject(
            IRenderingScene
        ),
        private readonly _guid: IGuid = Inject(IGuid)
    ) {
        super();
        this._assetInstanceId = _guid.guid();
        this.initialize();
    }
    public initialize(): void {
        // Model state contains the details about the animations and mesh assetId
        const modelState = this._entity.getProperty<IModelState>("modelState");
        const assetId = modelState.mesh.assetId;

        // Fetch instance of Asset
        switch (modelState.mesh.type) {
            case "GLTF":
                this.setGLTF(assetId, modelState);
                break;
            case "SPHERE":
                this._eventService.addEventListener(
                    CLIENT_ASSET_INSTANCE_REGISTERED_EVENT,
                    this.onClientAssetInstanceRegistered,
                    this
                );
                this.setSphere(assetId, modelState);
                break;
        }
    }
    public update(): void {
        // Nothing to update.
    }
    public dispose(): void {
        this._eventService.removeEventListener(
            CLIENT_ASSET_INSTANCE_REGISTERED_EVENT,
            this.onClientAssetInstanceRegistered,
            this
        );
    }
    private setGLTF(assetId: string, modelState: IModelState) {
        const clientAssetQuery = this._queryService.query(
            createFetchClientAssetQuery<IGLTFMeshConfig>({ assetId })
        );
        if (!clientAssetQuery.success) {
            // Log error and just ignore
            this._logger.error("Failed to fetch asset for entity.", {
                data: modelState,
                clientAssetQuery,
            });
            return;
        }
        this.setupEntityAsset(clientAssetQuery.result);
    }
    private setSphere(assetId: string, modelState: IModelState) {
        const clientAssetQuery = this._queryService.query(
            createFetchClientAssetQuery<ISphereMeshConfig>({ assetId })
        );
        if (!clientAssetQuery.success) {
            // Log error and just ignore
            this._logger.error("Failed to fetch asset for entity.", {
                data: modelState,
                clientAssetQuery,
            });
            return;
        }
        this.setupModelAsset(clientAssetQuery.result);
    }

    private setupModelAsset(clientAsset: IClientAsset) {
        const assetInstanceResult = this._commandService.send(
            createBuildClientAssetInstanceCommand({
                assetInstanceId: this._assetInstanceId,
                clientAsset,
                position: Vector3.Zero(),
            })
        );
        if (!assetInstanceResult.success) {
            this._logger.error("Failed to create instance", {
                clientEntityInstanced: this,
                assetInstanceResult,
            });
        }
    }
    private onClientAssetInstanceRegistered({
        clientAssetInstance: { assetInstanceId, mesh },
    }: ClientAssetInstanceRegisteredEventData) {
        if (assetInstanceId !== this._assetInstanceId) {
            return;
        }
        const boundingMesh = convertToEngineMesh(
            BoundingBoxGizmo.MakeNotPickableAndWrapInBoundingBox(mesh)
        );

        // Entity Specific details
        boundingMesh.ownerEntityId = this._entity.getProperty("id");
        this._eventService.publish(
            createMeshLoadedEvent({
                entityId: this._entity.id,
                mesh: boundingMesh,
            })
        );
    }

    private setupEntityAsset(clientAsset: IClientAsset<IGLTFMeshConfig>) {
        const modelState = clientAsset.data;
        SceneLoader.ImportMesh(
            undefined,
            modelState.path,
            modelState.file,
            this._renderingScene.scene,
            (meshes, _, __, animationList) => {
                try {
                    const name = `loaded_model_mesh_${this._entity.id}`;
                    const mesh = new Mesh(name);
                    mesh.addChild(meshes[0]);
                    meshes.forEach(childMesh => {
                        childMesh.parent = mesh;
                        childMesh.isPickable = false;
                    });
                    const boundingMesh = convertToEngineMesh(
                        BoundingBoxGizmo.MakeNotPickableAndWrapInBoundingBox(
                            mesh
                        )
                    );
                    boundingMesh.name = name;
                    boundingMesh.setEnabled(false);
                    boundingMesh.setPivotPoint(
                        new Vector3(0, modelState.heightOffset, 0),
                        Space.LOCAL
                    );

                    // Entity Specific details
                    boundingMesh.ownerEntityId = this._entity.getProperty("id");
                    this._eventService.publish(
                        createMeshLoadedEvent({
                            entityId: this._entity.id,
                            mesh: boundingMesh,
                        })
                    );

                    // Publish Animation Loaded Event
                    this._eventService.publish(
                        createAnimationListLoadedEvent({
                            entityId: this._entity.id,
                            animationList,
                        })
                    );
                    this._eventService.publish(
                        createPlayAnimationEvent({
                            entityId: this._entity.id,
                            animation: "Idle",
                        })
                    );
                } catch (ex) {
                    this._logger.error("Error loading mesh", {
                        ex,
                        modelState,
                    });
                }
            }
        );
    }
}
