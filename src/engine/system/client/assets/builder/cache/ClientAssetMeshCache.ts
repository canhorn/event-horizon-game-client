import { Mesh } from "babylonjs";
import { Dictionary } from "../../../../../../core/collection/Dictionary";
import { IDictionary } from "../../../../../../core/collection/IDictionary";

const STATE: {
    meshCache: IDictionary<string, Mesh>;
} = {
    meshCache: new Dictionary(),
};

export const getClientAssetMeshFromCache = (id: string): Mesh | undefined =>
    STATE.meshCache.getValue(id);

export const setClientAssetMeshInCache = (id: string, mesh: Mesh) => {
    mesh.setEnabled(false);
    return STATE.meshCache.setValue(id, mesh);
};
