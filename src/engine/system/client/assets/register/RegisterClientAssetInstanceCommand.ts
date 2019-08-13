import { Mesh, Vector3 } from "babylonjs";
import { ICommand } from "../../../../command/api/ICommand";
import { ICommandType } from "../../../../command/api/ICommandType";
import { CommandType } from "../../../../command/model/CommandType";

/**
 * Type: RegisterClientAssetInstanceCommand
 * NameSpace: Engine.System.Assets
 * Type: Command
 */
export const REGISTER_CLIENT_ASSET_INSTANCE_COMMAND = new CommandType(
    "Engine.System.Assets.REGISTER_CLIENT_ASSET_INSTANCE_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = REGISTER_CLIENT_ASSET_INSTANCE_COMMAND;
    public data?: RegisterClientAssetInstanceCommandData;
}
const instanceOfCommand = new CommandClass();
export const createRegisterClientAssetInstanceCommand = (
    data: RegisterClientAssetInstanceCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface RegisterClientAssetInstanceCommandData {
    assetInstanceId: string;
    mesh: Mesh;
    position: Vector3;
}
