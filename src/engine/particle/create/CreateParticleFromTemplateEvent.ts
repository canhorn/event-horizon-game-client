import { EventType, IEvent } from "../../event/EventType";
import { IParticleSettings } from "../model/IParticleSettings";

export const CREATE_PARTICLE_FROM_TEMPLATE_EVENT = new EventType(
    "particle.CREATE_PARTICLE_FROM_TEMPLATE_EVENT"
);

const createParticleFromTemplateEvent: IEvent = {
    type: CREATE_PARTICLE_FROM_TEMPLATE_EVENT,
};

export const createCreateParticleFromTemplateEvent = (
    data: CreateParticleFromTemplateEventData
): IEvent => {
    createParticleFromTemplateEvent.data = data;
    return createParticleFromTemplateEvent;
};

export interface CreateParticleFromTemplateEventData {
    id: number;
    templateId: string;
    settings: IParticleSettings;
}
