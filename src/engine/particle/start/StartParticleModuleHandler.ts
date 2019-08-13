import { EventType } from "../../event/EventType";
import { IEventHandler } from "../../event/IEventService";
import { Inject } from "../../ioc/Create";
import { IParticleLifecycleService } from "../IParticleService";
import { START_PARTICLE_MODULE_EVENT } from "./StartParticleModuleEvent";

export class StartParticleModuleHandler implements IEventHandler {
    public type: EventType = START_PARTICLE_MODULE_EVENT;

    constructor(
        private readonly _particleLifecycleService: IParticleLifecycleService = Inject(
            IParticleLifecycleService
        )
    ) {}

    public handle(moduleId: number) {
        this._particleLifecycleService.startModule(moduleId);
    }
}
