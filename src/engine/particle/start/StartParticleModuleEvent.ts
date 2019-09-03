import { EventType, IEvent } from "../../../core/event";

export const START_PARTICLE_MODULE_EVENT = new EventType(
    "particle.START_PARTICLE_MODULE"
);

const startParticleModuleEvent: IEvent = {
    type: START_PARTICLE_MODULE_EVENT,
};

export const createStartParticleModuleEvent = (data: number) => {
    startParticleModuleEvent.data = data;
    return startParticleModuleEvent;
};
