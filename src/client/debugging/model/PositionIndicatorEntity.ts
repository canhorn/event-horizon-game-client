import { Mesh, MeshBuilder, Scene } from "babylonjs";
import { Inject } from "../../../engine/ioc/Create";
import { IInitializable } from "../../../engine/lifecycle/IInitializable";
import { IRegisterInitializable } from "../../../engine/lifecycle/register/IRegisterInitializable";
import { IGuid } from "../../../engine/math/guid/IGuid";
import { IRenderingScene } from "../../../engine/renderer/api/IRenderingScene";
import { IObjectEntityDetails } from "../../entity/api/IObjectEntityDetails";
import { BasicEntity } from "../../entity/model/BasicEntity";
import { IN_VIEW_MODULE_NAME } from "../../modules/inView/api/IInViewModule";
import { InViewModule } from "../../modules/inView/model/InViewModule";
import { MESH_MODULE_NAME } from "../../modules/mesh/api/IMeshModule";
import { MeshModule } from "../../modules/mesh/model/MeshModule";

const STATE: {
    boxMesh?: Mesh;
} = {};
const createBox = (name: string, scene: Scene) => {
    if (!STATE.boxMesh) {
        STATE.boxMesh = MeshBuilder.CreateBox(
            "box",
            {
                size: 0.25,
            },
            scene
        );
    }
    return (STATE.boxMesh.createInstance(name) as unknown) as Mesh;
};

export class PositionIndicatorEntity extends BasicEntity
    implements IInitializable {
    constructor(
        details: IObjectEntityDetails,
        private readonly _registerInitializable: IRegisterInitializable = Inject(
            IRegisterInitializable
        ),
        private readonly _guid: IGuid = Inject(IGuid),
        private readonly _renderingScene: IRenderingScene = Inject(
            IRenderingScene
        )
    ) {
        super(details);
        _registerInitializable.register(this);
    }
    public initialize(): void {}
    public postInitialize(): void {
        this.registerModule(
            MESH_MODULE_NAME,
            new MeshModule(this.position, {
                mesh: createBox(
                    `position_indicator-${this._guid.guid()}`,
                    this._renderingScene.scene
                ),
            })
        );
        this.registerModule(IN_VIEW_MODULE_NAME, new InViewModule(this));
    }
    public onDispose(): void {
        this._registerInitializable.unregister(this);
    }
    public onUpdate(): void {}
}
