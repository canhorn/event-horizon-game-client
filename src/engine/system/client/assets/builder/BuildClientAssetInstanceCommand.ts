import { Vector3 } from "babylonjs";
import { ICommand } from "../../../../command/api/ICommand";
import { ICommandType } from "../../../../command/api/ICommandType";
import { CommandType } from "../../../../command/model/CommandType";
import { IClientAsset } from "../api/IClientAsset";

/**
 * Type: BuildClientAssetInstanceCommand
 * NameSpace: Engine.System.Client.Assets
 * Type: Command
 */
export const BUILD_CLIENT_ASSET_INSTANCE_COMMAND = new CommandType(
    "Engine.System.Client.Assets.BUILD_CLIENT_ASSET_INSTANCE_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = BUILD_CLIENT_ASSET_INSTANCE_COMMAND;
    public data?: BuildClientAssetInstanceCommandData;
}
const instanceOfCommand = new CommandClass();
export const createBuildClientAssetInstanceCommand = (
    data: BuildClientAssetInstanceCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface BuildClientAssetInstanceCommandData {
    assetInstanceId: string;
    clientAsset: IClientAsset;
    position: Vector3;
}
