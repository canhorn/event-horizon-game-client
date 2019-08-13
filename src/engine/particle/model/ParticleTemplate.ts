import { IParticleSettings } from "./IParticleSettings";

export interface ParticleTemplate {
    id: string;
    name: string;
    type: string;
    defaultSettings: IParticleSettings;
}
