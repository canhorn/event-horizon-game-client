import { ICommand } from "../../../../../core/command";
import { ICommandType } from "../../../../../core/command";
import { CommandType } from "../../../../../core/command";

/**
 * Name: DisposeOfClientAssetInstanceCommand
 * NameSpace: Engine.System.Client.Assets
 * Type: Command
 */
export const DISPOSE_OF_CLIENT_ASSET_INSTANCE_COMMAND = new CommandType(
    "Engine.System.Client.Assets.DisposeOfClientAssetInstanceCommand"
);
class CommandClass
    implements
        ICommand<
            DisposeOfClientAssetInstanceCommandData,
            DisposeOfClientAssetInstanceCommandResultType
        > {
    public type: ICommandType = DISPOSE_OF_CLIENT_ASSET_INSTANCE_COMMAND;
    public data?: DisposeOfClientAssetInstanceCommandData;
}
const instanceOfCommand = new CommandClass();
export const createDisposeOfClientAssetInstanceCommand = (
    data: DisposeOfClientAssetInstanceCommandData
): ICommand<
    DisposeOfClientAssetInstanceCommandData,
    DisposeOfClientAssetInstanceCommandResultType
> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface DisposeOfClientAssetInstanceCommandData {
    assetInstanceId: string;
}
export type DisposeOfClientAssetInstanceCommandResultType = undefined;
