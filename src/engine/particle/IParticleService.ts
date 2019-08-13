import { IServiceMeta } from "../service/IServiceMeta";
import { IParticleSettings } from "./model/IParticleSettings";
import { ParticleTemplate } from "./model/ParticleTemplate";

export abstract class IParticleService extends IServiceMeta {
    public abstract createFromTemplate(
        id: number,
        templateId: string,
        settings: IParticleSettings
    ): void;
    public abstract addTemplate(settings: ParticleTemplate): void;
}

export abstract class IParticleLifecycleService extends IServiceMeta {
    public abstract startModule(id: number): void;
    public abstract stopModule(id: number): void;
    public abstract disposeModule(id: number): void;
    public abstract updateModule(id: number, settings: IParticleSettings): void;
}
