import { EventType, IEventHandler } from "../../../core/event";
import { Inject } from "../../../core/ioc";
import { IParticleService } from "../IParticleService";
import {
    CREATE_PARTICLE_FROM_TEMPLATE_EVENT,
    CreateParticleFromTemplateEventData,
} from "./CreateParticleFromTemplateEvent";

export class CreateParticleFromTemplateHandler implements IEventHandler {
    public type: EventType = CREATE_PARTICLE_FROM_TEMPLATE_EVENT;

    constructor(
        private readonly _particleService: IParticleService = Inject(
            IParticleService
        )
    ) {}

    public handle(data: CreateParticleFromTemplateEventData) {
        this._particleService.createFromTemplate(
            data.id,
            data.templateId,
            data.settings
        );
    }
}
