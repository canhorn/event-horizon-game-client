import { II18nMap } from "../../../../core/i18n/model/II18nMap";
import { ILogger } from "../../../../core/logger";
import { ServerVector3 } from "../../../../engine/math/ServerVectors";
import { IObjectEntity } from "../../../entity/api/IObjectEntity";
import { ParticleEmitter } from "../../../particle/model/ParticleEmitter";

export interface ISkillActionScriptServices {
    logger: ILogger;
    i18n: II18nMap;
    entityRepository: ISkillActionServiceEntityRepository;
    entityBuilder: ISkillActionServiceEntityBuilder;
}

export interface ISkillActionServiceEntityRepository {
    get(id: number): IObjectEntity | undefined;
}
export interface ISkillActionServiceEntityBuilder {
    createParticleEmitter(
        templateId: string,
        position: ServerVector3,
        speed: number
    ): ParticleEmitter;
}
