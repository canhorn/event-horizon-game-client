import { ParticleSystem } from "babylonjs";
import { IParticleSettings } from "../model/IParticleSettings";

export interface IParticleModule {
    id: number;
    settings: IParticleSettings;
    particleSystem: ParticleSystem;
    start(): void;
    stop(): void;
    dispose(): void;
    update(settings: IParticleSettings): void;
}
