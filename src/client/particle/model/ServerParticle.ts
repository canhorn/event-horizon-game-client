import { IEventService } from "../../../core/event";
import { Inject } from "../../../core/ioc";
import { Entity } from "../../../engine/entity/model/Entity";
import { IDisposable } from "../../../engine/lifecycle/IDisposable";
import { IInitializable } from "../../../engine/lifecycle/IInitializable";
import { IRegisterDisposable } from "../../../engine/lifecycle/register/IRegisterDisposable";
import { IRegisterInitializable } from "../../../engine/lifecycle/register/IRegisterInitializable";
import { createCreateParticleFromTemplateEvent } from "../../../engine/particle/create/CreateParticleFromTemplateEvent";
import { createDisposeParticleModuleEvent } from "../../../engine/particle/dispose/DisposeParticleModuleEvent";
import { createStartParticleModuleEvent } from "../../../engine/particle/start/StartParticleModuleEvent";
import { createStopParticleModuleEvent } from "../../../engine/particle/stop/StopParticleModuleEvent";
import { IObjectEntity } from "../../entity/api/IObjectEntity";
import {
    MESH_SET_EVENT,
    MeshSetEventData,
} from "../../modules/mesh/set/MeshSetEvent";
import { IParticleEmitter } from "../api/IParticleEmitter";
import { getMeshEmitter } from "../getEmitter/GetMeshEmitter";

/**
 * This can be used to create ClientSide Particle Systems based on Server Side particle configuration.
 */
export class ServerParticle extends Entity
    implements IInitializable, IDisposable, IParticleEmitter {
    private _particleId: number;
    private _running: boolean = false;

    get running(): boolean {
        return this._running;
    }

    constructor(
        private readonly _entity: IObjectEntity,
        private readonly _templateId: string,
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _registerInitializable: IRegisterInitializable = Inject(
            IRegisterInitializable
        ),
        private readonly _registerDisposable: IRegisterDisposable = Inject(
            IRegisterDisposable
        )
    ) {
        super();
        this._particleId = this._indexPool.nextIndex();
        this._registerInitializable.register(this);
        this._registerDisposable.register(this);
        this._eventService.on(MESH_SET_EVENT, this.onMeshSet, this);
    }
    public initialize(): void {
        this.setup();
    }
    public postInitialize(): void {}
    public start() {
        this._eventService.publish(
            createStartParticleModuleEvent(this._particleId)
        );
        this._running = true;
    }
    public stop() {
        this._eventService.publish(
            createStopParticleModuleEvent(this._particleId)
        );
        this._running = false;
    }
    public dispose() {
        this._eventService.publish(
            createDisposeParticleModuleEvent(this._particleId)
        );
        this._eventService.off(MESH_SET_EVENT, this.onMeshSet, this);
    }

    private setup(): void {
        this._eventService.publish(
            createCreateParticleFromTemplateEvent({
                id: this._particleId,
                templateId: this._templateId,
                settings: {
                    emitter: getMeshEmitter(this._entity),
                },
            })
        );
    }

    private onMeshSet({ id }: MeshSetEventData) {
        if (this._entity.id !== id) {
            return;
        }
        this._eventService.publish(
            createDisposeParticleModuleEvent(this._particleId)
        );
        this.setup();
        if (this._running) {
            this.start();
        }
    }
}
