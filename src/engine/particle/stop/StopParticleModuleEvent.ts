import { EventType, IEvent } from "../../event/EventType";

export const STOP_PARTICLE_MODULE_EVENT = new EventType(
    "particle.STOP_PARTICLE_MODULE_EVENT"
);

const stopParticleModuleEvent: IEvent = {
    type: STOP_PARTICLE_MODULE_EVENT,
};

export const createStopParticleModuleEvent = (data: number): IEvent => {
    stopParticleModuleEvent.data = data;
    return stopParticleModuleEvent;
};
