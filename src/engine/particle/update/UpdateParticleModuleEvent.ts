import { EventType, IEvent } from "../../event/EventType";
import { IParticleSettings } from "../model/IParticleSettings";

export const UPDATE_PARTICLE_MODULE_EVENT = new EventType(
    "particle.UPDATE_PARTICLE_MODULE_EVENT"
);

const updateParticleModuleEvent: IEvent = {
    type: UPDATE_PARTICLE_MODULE_EVENT,
};

export const createUpdateParticleModuleEvent = (
    data: UpdateParticleModuleEventData
) => {
    updateParticleModuleEvent.data = data;
    return updateParticleModuleEvent;
};

export interface UpdateParticleModuleEventData {
    id: number;
    settings: IParticleSettings;
}
