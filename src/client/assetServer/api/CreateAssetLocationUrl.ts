import { Configuration } from "../../../core/configuration/Configuration";

export const createAssetLocationUrl = (assetPath: string) => {
    const assetServerUrl = Configuration.getConfig("ASSET_SERVER") || "";
    return `${assetServerUrl}${assetPath}`;
};
