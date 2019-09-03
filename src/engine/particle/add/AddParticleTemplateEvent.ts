import { EventType, IEvent } from "../../../core/event";
import { ParticleTemplate } from "../model/ParticleTemplate";

export const ADD_PARTICLE_TEMPLATE_EVENT = new EventType(
    "particle.ADD_PARTICLE_TEMPLATE_EVENT"
);

const addParticleTemplateEvent: IEvent = {
    type: ADD_PARTICLE_TEMPLATE_EVENT,
};

export const createAddParticleTemplateEvent = (
    data: AddParticleTemplateEventData
) => {
    addParticleTemplateEvent.data = data;
    return addParticleTemplateEvent;
};

export interface AddParticleTemplateEventData {
    template: ParticleTemplate;
}
