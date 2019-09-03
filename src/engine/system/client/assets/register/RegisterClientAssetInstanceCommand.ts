import { Mesh, Vector3 } from "babylonjs";
import {
    CommandType,
    ICommand,
    ICommandType,
} from "../../../../../core/command";

/**
 * Name: RegisterClientAssetInstanceCommand
 * NameSpace: Engine.System.Assets
 * Type: Command
 */
export const REGISTER_CLIENT_ASSET_INSTANCE_COMMAND = new CommandType(
    "Engine.System.Assets.REGISTER_CLIENT_ASSET_INSTANCE_COMMAND"
);
class CommandClass
    implements
        ICommand<
            RegisterClientAssetInstanceCommandData,
            RegisterClientAssetInstanceCommandResultType
        > {
    public type: ICommandType = REGISTER_CLIENT_ASSET_INSTANCE_COMMAND;
    public data?: RegisterClientAssetInstanceCommandData;
}
const instanceOfCommand = new CommandClass();
export const createRegisterClientAssetInstanceCommand = (
    data: RegisterClientAssetInstanceCommandData
): ICommand<
    RegisterClientAssetInstanceCommandData,
    RegisterClientAssetInstanceCommandResultType
> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface RegisterClientAssetInstanceCommandData {
    assetInstanceId: string;
    mesh: Mesh;
    position: Vector3;
}
export type RegisterClientAssetInstanceCommandResultType = undefined;
