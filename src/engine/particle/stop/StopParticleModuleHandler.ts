import { EventType, IEventHandler } from "../../../core/event";
import { Inject } from "../../../core/ioc";
import { Entity } from "../../entity/model/Entity";
import { IParticleLifecycleService } from "../IParticleService";
import { STOP_PARTICLE_MODULE_EVENT } from "./StopParticleModuleEvent";

export class StopParticleModuleHandler extends Entity implements IEventHandler {
    public type: EventType = STOP_PARTICLE_MODULE_EVENT;

    constructor(
        private readonly _particleLifecycleService: IParticleLifecycleService = Inject(
            IParticleLifecycleService
        )
    ) {
        super();
    }

    public handle(moduleId: number) {
        this._particleLifecycleService.stopModule(moduleId);
    }
}
