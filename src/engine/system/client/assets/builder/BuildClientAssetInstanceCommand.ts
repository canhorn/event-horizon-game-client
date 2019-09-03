import { Vector3 } from "babylonjs";
import {
    CommandType,
    ICommand,
    ICommandType,
} from "../../../../../core/command";
import { IClientAsset } from "../api/IClientAsset";

/**
 * Type: BuildClientAssetInstanceCommand
 * NameSpace: Engine.System.Client.Assets
 * Type: Command
 */
export const BUILD_CLIENT_ASSET_INSTANCE_COMMAND = new CommandType(
    "Engine.System.Client.Assets.BUILD_CLIENT_ASSET_INSTANCE_COMMAND"
);
class CommandClass
    implements
        ICommand<
            BuildClientAssetInstanceCommandData,
            BuildClientAssetInstanceCommandResultType
        > {
    public type: ICommandType = BUILD_CLIENT_ASSET_INSTANCE_COMMAND;
    public data?: BuildClientAssetInstanceCommandData;
}
const instanceOfCommand = new CommandClass();
export const createBuildClientAssetInstanceCommand = (
    data: BuildClientAssetInstanceCommandData
): ICommand<
    BuildClientAssetInstanceCommandData,
    BuildClientAssetInstanceCommandResultType
> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface BuildClientAssetInstanceCommandData {
    assetInstanceId: string;
    clientAsset: IClientAsset;
    position: Vector3;
}
export type BuildClientAssetInstanceCommandResultType =
    | "invalid_type"
    | undefined;
