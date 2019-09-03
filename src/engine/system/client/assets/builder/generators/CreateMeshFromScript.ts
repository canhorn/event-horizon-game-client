import { Mesh } from "babylonjs";
import "babylonjs-loaders";
import { IGuid } from "../../../../../../core/guid/IGuid";
import { Inject } from "../../../../../../core/ioc";
import { IRenderingScene } from "../../../../../renderer/api/IRenderingScene";
import { runClientScriptWithReturn } from "../../../scripts/run/RunClientScript";
import { IAssetScriptConfig } from "../../api/configs/IAssetScriptConfig";
import { IClientAsset } from "../../api/IClientAsset";

export const createMeshFromScript = (
    clientAsset: IClientAsset<IAssetScriptConfig>,
    renderingScene: IRenderingScene = Inject(IRenderingScene),
    guid: IGuid = Inject(IGuid)
): Promise<Mesh> => {
    const assetConfig: IAssetScriptConfig = clientAsset.data;
    return new Promise((resolve, _) => {
        const meshPromise: Promise<Mesh> = runClientScriptWithReturn(
            `client_script-${clientAsset.id}`,
            assetConfig.script,
            {
                id: clientAsset.id,
                scene: renderingScene.scene,
                ...assetConfig,
            }
        );
        resolve(meshPromise);
        // reject(new ErrorCode(`No supported type.`, "not_supported_type"));
    });
};
