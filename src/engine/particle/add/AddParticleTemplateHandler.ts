import { EventType, IEventHandler } from "../../../core/event";
import { Inject } from "../../../core/ioc";
import { IParticleService } from "../IParticleService";
import {
    ADD_PARTICLE_TEMPLATE_EVENT,
    AddParticleTemplateEventData,
} from "./AddParticleTemplateEvent";

export class AddParticleTemplateHandler implements IEventHandler {
    public type: EventType = ADD_PARTICLE_TEMPLATE_EVENT;

    constructor(
        private readonly _particleTemplate: IParticleService = Inject(
            IParticleService
        )
    ) {}

    public handle(data: AddParticleTemplateEventData) {
        this._particleTemplate.addTemplate(data.template);
    }
}
