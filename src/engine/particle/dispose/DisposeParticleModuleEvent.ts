import { EventType, IEvent } from "../../event/EventType";

export const DISPOSE_PARTICLE_MODULE_EVENT = new EventType(
    "particle.DISPOSE_PARTICLE_MODULE_EVENT"
);

const disposeParticleModuleEvent: IEvent = {
    type: DISPOSE_PARTICLE_MODULE_EVENT,
};

export const createDisposeParticleModuleEvent = (data: number): IEvent => {
    disposeParticleModuleEvent.data = data;
    return disposeParticleModuleEvent;
};
