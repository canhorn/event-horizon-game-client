import { II18nMap } from "../../../../core/i18n/model/II18nMap";
import { IGuiLayoutData } from "../../../../engine/gui/api/IGuiLayoutData";
import { ParticleTemplate } from "../../../../engine/particle/model/ParticleTemplate";
import { IClientAsset } from "../../../../engine/system/client/assets/api/IClientAsset";
import { IClientEntityInstance } from "../../../../engine/system/client/entityInstance/api/IClientEntityInstance";
import { IClientScriptTemplate } from "../../../../engine/system/client/scripts/api/IClientScriptTemplate";
import { IServerModuleScripts } from "../../../../engine/system/server/api/IServerModuleScripts";
import { ILightSettings } from "../../../entity/api/ILightSettings";
import { IMapMeshSettings } from "../../../entity/api/IMapMeshSettings";
import { IObjectEntityDetails } from "../../../entity/api/IObjectEntityDetails";
import { IEntityScriptModule } from "../../../systems/entityModule/api/IEntityScriptModule";
import { IMapGraph } from "../../../systems/map/api/IMapGraph";

export interface IZoneInfo {
    i18nMap: II18nMap;
    lighting: ILightSettings;
    map: IMapGraph;
    mapMesh: IMapMeshSettings;
    particleTemplateList: ParticleTemplate[];
    guiLayoutList: IGuiLayoutData[];
    clientAssetList: IClientAsset[];
    clientEntityInstanceList: IClientEntityInstance[];
    clientScriptList: IClientScriptTemplate[];
    entityList: IObjectEntityDetails[];
    serverModuleScriptList: IServerModuleScripts[];
    baseEntityScriptModuleList: IEntityScriptModule[];
    playerEntityScriptModuleList: IEntityScriptModule[];
}
