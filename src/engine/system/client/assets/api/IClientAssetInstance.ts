import { IDisposable } from "../../../../lifecycle/IDisposable";
import { EngineMesh } from "../../../../renderer/EngineMesh";

export interface IClientAssetInstance extends IDisposable {
    assetInstanceId: string;
    mesh: EngineMesh;
}
