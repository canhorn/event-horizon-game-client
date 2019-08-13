import { Entity } from "../../entity/model/Entity";
import { EventType } from "../../event/EventType";
import { IEventHandler } from "../../event/IEventService";
import { Inject } from "../../ioc/Create";
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
