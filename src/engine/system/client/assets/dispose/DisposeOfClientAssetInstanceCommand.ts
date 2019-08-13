import { ICommand } from "../../../../command/api/ICommand";
import { ICommandType } from "../../../../command/api/ICommandType";
import { CommandType } from "../../../../command/model/CommandType";

/**
 * Type: DisposeOfClientAssetInstanceCommand
 * NameSpace: Engine.System.Client.Assets
 * Type: Command
 */
export const DISPOSE_OF_CLIENT_ASSET_INSTANCE_COMMAND = new CommandType(
    "Engine.System.Client.Assets.DISPOSE_OF_CLIENT_ASSET_INSTANCE_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = DISPOSE_OF_CLIENT_ASSET_INSTANCE_COMMAND;
    public data?: DisposeOfClientAssetInstanceCommandData;
}
const instanceOfCommand = new CommandClass();
export const createDisposeOfClientAssetInstanceCommand = (
    data: DisposeOfClientAssetInstanceCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface DisposeOfClientAssetInstanceCommandData {
    assetInstanceId: string;
}
