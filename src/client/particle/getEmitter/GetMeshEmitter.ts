import { IObjectEntity } from "../../entity/api/IObjectEntity";
import {
    IMeshModule,
    MESH_MODULE_NAME,
} from "../../modules/mesh/api/IMeshModule";

export const getMeshEmitter = (entity: IObjectEntity) =>
    entity.getProperty<IMeshModule>(MESH_MODULE_NAME).mesh;
