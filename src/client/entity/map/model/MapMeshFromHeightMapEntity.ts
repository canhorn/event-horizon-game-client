import { GroundMesh, MeshBuilder, PointLight } from "babylonjs";
import { autobind } from "../../../../core/autobind/autobind";
import { ICommandService } from "../../../../core/command";
import { IEventService } from "../../../../core/event";
import { IGuid } from "../../../../core/guid/IGuid";
import { Inject } from "../../../../core/ioc";
import { isObjectDefined } from "../../../../core/object/ObjectCheck";
import { IQueryService } from "../../../../core/query";
import { LifeCycleEntity } from "../../../../engine/lifecycle/model/LifeCycleEntity";
import { IRenderingScene } from "../../../../engine/renderer/api/IRenderingScene";
import { createAssetLocationUrl } from "../../../assetServer/api/CreateAssetLocationUrl";
import { createSetHeightResolverCoordinatesCommand } from "../../../systems/height/set/SetHeightResolverCoordinatesCommand";
import {
    POINTER_HIT_MESH_EVENT,
    PointerHitMeshEventData,
} from "../../../systems/screenPointer/mesh/PointerHitMeshEvent";
import { ILightEntity } from "../../api/ILightEntity";
import { IMapMeshSettings } from "../../api/IMapMeshSettings";
import { createQueryForEntity } from "../../tracked/query/QueryForEntity";
import { createMapMeshHitEvent } from "../hit/MapMeshHitEvent";
import { MapMeshMaterial } from "../material/MapMeshMaterial";
import { createMapMeshReadyEvent } from "../ready/MapMeshReadyEvent";

export class MapMeshFromHeightMapEntity extends LifeCycleEntity {
    private _mesh!: GroundMesh;
    constructor(
        private readonly _settings: IMapMeshSettings,
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _queryService: IQueryService = Inject(IQueryService),
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        ),
        private readonly _guid: IGuid = Inject(IGuid),
        private readonly _renderingScene: IRenderingScene = Inject(
            IRenderingScene
        )
    ) {
        super();
    }
    public initialize(): void {
        const name = this._settings.name || `mapMesh_${this._guid.guid()}`;
        const assetUrl = createAssetLocationUrl(this._settings.heightMapUrl);
        this._mesh = MeshBuilder.CreateGroundFromHeightMap(
            name,
            assetUrl,
            this.getSettings(),
            this._renderingScene.scene
        );
        this._mesh.material = new MapMeshMaterial(
            `${name}_material`,
            this.getLight()
        );
        if (isObjectDefined(this._settings.isPickable)) {
            this._mesh.isPickable = this._settings.isPickable;
        }
        if (this._mesh.isPickable) {
            this._eventService.on(
                POINTER_HIT_MESH_EVENT,
                this.onPointerHitMeshEvent,
                this
            );
        }
    }
    public onDispose(): void {
        this._eventService.off(
            POINTER_HIT_MESH_EVENT,
            this.onPointerHitMeshEvent,
            this
        );
        this._mesh.dispose();
    }
    public update(): void {}
    public draw(): void {}
    private getSettings() {
        return {
            ...this._settings,
            onReady: this.ready,
        };
    }
    @autobind
    private ready(mesh: GroundMesh): void {
        mesh.updateCoordinateHeights();
        this._commandService.send(
            createSetHeightResolverCoordinatesCommand({
                heightCoordinates: this._mesh,
            })
        );
        this._eventService.publish(createMapMeshReadyEvent({}));
    }
    private getLight(): PointLight | undefined {
        const entityQueryList = this._queryService.query(
            createQueryForEntity<ILightEntity>({
                tag: this._settings.lightTag,
            })
        ).result;
        return entityQueryList[0].renderLight as PointLight;
    }
    private onPointerHitMeshEvent({
        meshName,
        position,
    }: PointerHitMeshEventData) {
        if (meshName !== this._mesh.name) {
            return;
        }
        this._eventService.publish(createMapMeshHitEvent({ position }));
    }
}
