import { EventType, IEventHandler } from "../../../core/event";
import { Inject } from "../../../core/ioc";
import { Entity } from "../../entity/model/Entity";
import { IParticleLifecycleService } from "../IParticleService";
import {
    UPDATE_PARTICLE_MODULE_EVENT,
    UpdateParticleModuleEventData,
} from "./UpdateParticleModuleEvent";

export class UpdateParticleModuleHandler extends Entity
    implements IEventHandler {
    public type: EventType = UPDATE_PARTICLE_MODULE_EVENT;

    constructor(
        private readonly _particleLifecycleService: IParticleLifecycleService = Inject(
            IParticleLifecycleService
        )
    ) {
        super();
    }

    public handle(data: UpdateParticleModuleEventData) {
        this._particleLifecycleService.updateModule(data.id, data.settings);
    }
}
