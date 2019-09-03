import { EventType, IEventHandler } from "../../../core/event";
import { Inject } from "../../../core/ioc";
import { IParticleLifecycleService } from "../IParticleService";
import { DISPOSE_PARTICLE_MODULE_EVENT } from "./DisposeParticleModuleEvent";

export class DisposeParticleModuleHandler implements IEventHandler {
    public type: EventType = DISPOSE_PARTICLE_MODULE_EVENT;

    constructor(
        private readonly _particleLifecycleService: IParticleLifecycleService = Inject(
            IParticleLifecycleService
        )
    ) {}

    public handle(moduleId: number) {
        this._particleLifecycleService.disposeModule(moduleId);
    }
}
