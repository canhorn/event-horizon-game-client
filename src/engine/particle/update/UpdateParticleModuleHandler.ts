import { Entity } from "../../entity/model/Entity";
import { EventType } from "../../event/EventType";
import { IEventHandler } from "../../event/IEventService";
import { Inject } from "../../ioc/Create";
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
