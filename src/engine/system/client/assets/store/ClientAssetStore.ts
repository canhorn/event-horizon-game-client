import { Dictionary } from "../../../../../core/collection/Dictionary";
import { IDictionary } from "../../../../../core/collection/IDictionary";
import { isObjectDefined } from "../../../../../core/object/ObjectCheck";
import { IClientAsset } from "../api/IClientAsset";
import { IClientAssetInstance } from "../api/IClientAssetInstance";

const STORE: IDictionary<string, IClientAsset> = new Dictionary<
    string,
    IClientAsset
>();
const INSTANCE_STORE: IDictionary<
    string,
    IClientAssetInstance
> = new Dictionary();

export const allClientAssets = () => STORE.values();
export const getClientAsset = (id: string): IClientAsset | undefined =>
    STORE.getValue(id);
export const containsClientAsset = (id: string): boolean =>
    STORE.containsKey(id);
export const setClientAsset = (clientAsset: IClientAsset): IClientAsset =>
    STORE.setValue(clientAsset.id, clientAsset);
export const removeClientAsset = (id: string): IClientAsset | undefined =>
    STORE.remove(id);

export const setClientAssetInstance = (
    clientAssetInstance: IClientAssetInstance
) => {
    const existingAsset = INSTANCE_STORE.getValue(
        clientAssetInstance.assetInstanceId
    );
    if (isObjectDefined(existingAsset)) {
        existingAsset.dispose();
    }
    INSTANCE_STORE.setValue(
        clientAssetInstance.assetInstanceId,
        clientAssetInstance
    );
};
export const getClientAssetInstance = (assetInstanceId: string) =>
    INSTANCE_STORE.getValue(assetInstanceId);
export const removeClientAssetInstance = (assetInstanceId: string) =>
    INSTANCE_STORE.remove(assetInstanceId);
