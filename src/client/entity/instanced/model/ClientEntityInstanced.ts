import { ICommandService } from "../../../../core/command";
import { IEventService } from "../../../../core/event";
import { IGuid } from "../../../../core/guid/IGuid";
import { Inject } from "../../../../core/ioc";
import { ILogger } from "../../../../core/logger";
import { createLogger } from "../../../../core/logger";
import { IQueryService } from "../../../../core/query";
import { IInitializable } from "../../../../engine/lifecycle/IInitializable";
import { IRegisterDisposable } from "../../../../engine/lifecycle/register/IRegisterDisposable";
import { IRegisterInitializable } from "../../../../engine/lifecycle/register/IRegisterInitializable";
import { IRegisterUpdatable } from "../../../../engine/lifecycle/register/IRegisterUpdatable";
import { ServerVector3Mapper } from "../../../../engine/math/ServerVectors";
import { IClientAsset } from "../../../../engine/system/client/assets/api/IClientAsset";
import { createBuildClientAssetInstanceCommand } from "../../../../engine/system/client/assets/builder/BuildClientAssetInstanceCommand";
import { createDisposeOfClientAssetInstanceCommand } from "../../../../engine/system/client/assets/dispose/DisposeOfClientAssetInstanceCommand";
import { createFetchClientAssetQuery } from "../../../../engine/system/client/assets/fetch/FetchClientAssetQuery";
import {
    CLIENT_ASSET_INSTANCE_REGISTERED_EVENT,
    ClientAssetInstanceRegisteredEventData,
} from "../../../../engine/system/client/assets/register/ClientAssetInstanceRegisteredEvent";
import { IClientEntityInstance } from "../../../../engine/system/client/entityInstance/api/IClientEntityInstance";
import { IN_VIEW_MODULE_NAME } from "../../../modules/inView/api/IInViewModule";
import { InViewModule } from "../../../modules/inView/model/InViewModule";
import { MESH_MODULE_NAME } from "../../../modules/mesh/api/IMeshModule";
import { MeshModule } from "../../../modules/mesh/model/MeshModule";
import { BasicEntity } from "../../model/BasicEntity";

/**
 * This is a representation of an instanced entity on the map.
 * These can be any Asset type that is on the map;
 * The asset will dictate the display of the entity.
 */
export class ClientEntityInstanced extends BasicEntity
    implements IInitializable {
    private _assetInstanceId: string;

    constructor(
        private readonly _clientEntityInstanceData: IClientEntityInstance,
        private readonly _logger: ILogger = createLogger(
            "ClientEntityInstanced"
        ),
        private readonly _registerInitializable: IRegisterInitializable = Inject(
            IRegisterInitializable
        ),
        private readonly _registerDisposable: IRegisterDisposable = Inject(
            IRegisterDisposable
        ),
        private readonly _registerUpdatable: IRegisterUpdatable = Inject(
            IRegisterUpdatable
        ),
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _queryService: IQueryService = Inject(IQueryService),
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        ),
        guid: IGuid = Inject(IGuid)
    ) {
        super({
            id: -1,
            data: {
                ..._clientEntityInstanceData.properties,
            },
        });
        this._assetInstanceId = guid.guid();
        _eventService.on(
            CLIENT_ASSET_INSTANCE_REGISTERED_EVENT,
            this.onClientAssetInstanceRegistered,
            this
        );
        _registerInitializable.register(this);
        _registerDisposable.register(this);
        _registerUpdatable.register(this);
    }

    public initialize(): void {}
    public postInitialize(): void {
        const { assetId } = this._clientEntityInstanceData;
        // Fetch instance of Asset
        const clientAssetQuery = this._queryService.query(
            createFetchClientAssetQuery<IClientAsset>({ assetId })
        );
        if (!clientAssetQuery.success) {
            // Log error and just ignore
            this._logger.error("Failed to fetch asset for entity.", {
                data: this._clientEntityInstanceData,
                clientAssetQuery,
            });
            return;
        }
        this.setupEntityAsset(clientAssetQuery.result);
    }
    public onDispose(): void {
        this._eventService.off(
            CLIENT_ASSET_INSTANCE_REGISTERED_EVENT,
            this.onClientAssetInstanceRegistered,
            this
        );
        this._commandService.send(
            createDisposeOfClientAssetInstanceCommand({
                assetInstanceId: this._assetInstanceId || "",
            })
        );
        this._registerInitializable.unregister(this);
        this._registerDisposable.unregister(this);
        this._registerUpdatable.unregister(this);
    }
    public onUpdate(): void {}

    private setupEntityAsset(clientAsset: IClientAsset) {
        // Create Instance of ClientAsset
        // Pass location of Asset from _clientEntityInstanceData
        const assetInstanceResult = this._commandService.send(
            createBuildClientAssetInstanceCommand({
                assetInstanceId: this._assetInstanceId,
                clientAsset,
                position: ServerVector3Mapper.mapToVector3(
                    this._clientEntityInstanceData.position
                ),
            })
        );
        if (!assetInstanceResult.success) {
            this._logger.error("Failed to create instance", {
                clientEntityInstanced: this,
                assetInstanceResult,
            });
        }
        // TODO: Set any properties of Asset
    }
    private onClientAssetInstanceRegistered({
        clientAssetInstance: { assetInstanceId, mesh },
    }: ClientAssetInstanceRegisteredEventData) {
        if (assetInstanceId !== this._assetInstanceId) {
            return;
        }
        this.registerModule(
            MESH_MODULE_NAME,
            new MeshModule(
                ServerVector3Mapper.mapToVector3(
                    this._clientEntityInstanceData.position
                ),
                {
                    mesh,
                }
            )
        );
        this.registerModule(IN_VIEW_MODULE_NAME, new InViewModule(this));
    }
}
