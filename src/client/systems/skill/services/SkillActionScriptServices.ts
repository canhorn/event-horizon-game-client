import { getI18nState } from "../../../../engine/i18n/store/I18nStore";
import { Inject } from "../../../../engine/ioc/Create";
import { ILogger } from "../../../../engine/logger/LoggerFactory";
import { ServerVector3 } from "../../../../engine/math/ServerVectors";
import { IQueryService } from "../../../../engine/query/IQueryService";
import { IObjectEntity } from "../../../entity/api/IObjectEntity";
import { createQueryForEntity } from "../../../entity/tracked/query/QueryForEntity";
import { createIdTag } from "../../../entity/tracked/tagTypes/CreateIdTag";
import { ParticleEmitter } from "../../../particle/model/ParticleEmitter";
import { ISkillActionScriptServices } from "../api/ISkillActionScriptServices";

export const buildSkillActionScriptServices = (
    logger: ILogger,
    queryService: IQueryService = Inject(IQueryService)
): ISkillActionScriptServices => ({
    get logger() {
        return logger;
    },
    get i18n() {
        return getI18nState();
    },
    entityRepository: {
        get: (id: number) => {
            return queryService.query(
                createQueryForEntity<IObjectEntity>({
                    tag: createIdTag(id),
                })
            ).result[0];
        },
    },
    entityBuilder: {
        createParticleEmitter: (
            templateId: string,
            position: ServerVector3,
            speed: number
        ) => new ParticleEmitter(templateId, position, speed),
    },
});
