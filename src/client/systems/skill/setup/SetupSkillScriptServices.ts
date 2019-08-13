import { Inject } from "../../../../engine/ioc/Create";
import { ServerVector3 } from "../../../../engine/math/ServerVectors";
import { IQueryService } from "../../../../engine/query/IQueryService";
import { extendScriptServices } from "../../../../engine/system/script/extend/ExtendScriptServices";
import { IObjectEntity } from "../../../entity/api/IObjectEntity";
import { createQueryForEntity } from "../../../entity/tracked/query/QueryForEntity";
import { createIdTag } from "../../../entity/tracked/tagTypes/CreateIdTag";
import { ParticleEmitter } from "../../../particle/model/ParticleEmitter";

export const setupSkillScriptServices = () => {
    extendScriptServices("entityRepository", {
        get: (
            id: number,
            queryService: IQueryService = Inject(IQueryService)
        ) => {
            return queryService.query(
                createQueryForEntity<IObjectEntity>({
                    tag: createIdTag(id),
                })
            ).result[0];
        },
    });
    extendScriptServices("entityBuilder", {
        createParticleEmitter: (
            templateId: string,
            position: ServerVector3,
            speed: number
        ) => new ParticleEmitter(templateId, position, speed),
    });
};
