import { Mesh, MeshBuilder } from "babylonjs";
import { IEventService } from "../../../core/event";
import { Inject } from "../../../core/ioc";
import { IDisposable } from "../../../engine/lifecycle/IDisposable";
import { IInitializable } from "../../../engine/lifecycle/IInitializable";
import { IUpdatable } from "../../../engine/lifecycle/IUpdatable";
import { IRegisterDisposable } from "../../../engine/lifecycle/register/IRegisterDisposable";
import { IRegisterUpdatable } from "../../../engine/lifecycle/register/IRegisterUpdatable";
import {
    ServerVector3,
    ServerVector3Mapper,
} from "../../../engine/math/ServerVectors";
import { createCreateParticleFromTemplateEvent } from "../../../engine/particle/create/CreateParticleFromTemplateEvent";
import { createDisposeParticleModuleEvent } from "../../../engine/particle/dispose/DisposeParticleModuleEvent";
import { createStartParticleModuleEvent } from "../../../engine/particle/start/StartParticleModuleEvent";
import { createStopParticleModuleEvent } from "../../../engine/particle/stop/StopParticleModuleEvent";
import { IRenderingScene } from "../../../engine/renderer/api/IRenderingScene";
import { BasicEntity } from "../../entity/model/BasicEntity";
import { MESH_MODULE_NAME } from "../../modules/mesh/api/IMeshModule";
import { MeshModule } from "../../modules/mesh/model/MeshModule";
import {
    IMoveModule,
    MOVE_MODULE_NAME,
} from "../../modules/move/api/IMoveModule";
import { MoveModule } from "../../modules/move/model/MoveModule";
import { STATE_MODULE_NAME } from "../../modules/state/api/IStateModule";
import { StateModule } from "../../modules/state/model/StateModule";
import { IParticleEmitter } from "../api/IParticleEmitter";

export class ParticleEmitter extends BasicEntity
    implements IInitializable, IDisposable, IUpdatable, IParticleEmitter {
    private _particleId!: number;
    private _emitter!: Mesh;

    constructor(
        private readonly _templateId: string,
        private readonly _startingPosition: ServerVector3,
        private _speed: number = 1,
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _renderingScene: IRenderingScene = Inject(
            IRenderingScene
        ),
        private readonly _registerUpdatable: IRegisterUpdatable = Inject(
            IRegisterUpdatable
        ),
        private readonly _registerDisposable: IRegisterDisposable = Inject(
            IRegisterDisposable
        )
    ) {
        super({
            id: -1,
            position: {
                currentPosition: _startingPosition,
            },
            data: {},
        });
        this._registerUpdatable.register(this);
        this._registerDisposable.register(this);
        this.initialize();
    }
    public initialize(): void {
        this.setup();
        this.start();
    }
    public postInitialize(): void {}
    public onUpdate() {}
    public onDispose(): void {
        this._eventService.publish(
            createDisposeParticleModuleEvent(this._particleId)
        );
        this._emitter.dispose();
        this._registerUpdatable.unregister(this);
        this._registerDisposable.unregister(this);
    }
    public start() {
        this._eventService.publish(
            createStartParticleModuleEvent(this._particleId)
        );
    }
    public stop() {
        this._eventService.publish(
            createStopParticleModuleEvent(this._particleId)
        );
    }
    public moveTo(position: ServerVector3) {
        this.getProperty<IMoveModule>(MOVE_MODULE_NAME).onMove({
            entityId: -1,
            moveTo: ServerVector3Mapper.mapToVector3(position),
        });
    }

    private setup(): void {
        this._particleId = this._indexPool.nextIndex();

        this._emitter = MeshBuilder.CreateBox(
            "ParticleEmitter_" + this._particleId,
            {},
            this._renderingScene.scene
        );
        const stateModule = new StateModule(this);
        this.registerModule(STATE_MODULE_NAME, stateModule);
        const meshModule = new MeshModule(
            ServerVector3Mapper.mapToVector3(this._startingPosition),
            {
                mesh: this._emitter,
            }
        );
        this.registerModule(MESH_MODULE_NAME, meshModule);
        const moveModule = new MoveModule(this, this._speed);
        this.registerModule(MOVE_MODULE_NAME, moveModule);
        this._emitter.isVisible = false;
        // this._emitter.position = new Vector3(10, 10, 10);

        this._eventService.publish(
            createCreateParticleFromTemplateEvent({
                id: this._particleId,
                templateId: this._templateId,
                settings: {
                    name: "Particle_Emitter",
                    emitter: this._emitter,
                },
            })
        );
    }
}
