import { ICommand } from "../../../../command/api/ICommand";
import { ICommandType } from "../../../../command/api/ICommandType";
import { CommandType } from "../../../../command/model/CommandType";
import { IClientEntityInstance } from "../api/IClientEntityInstance";

/**
 * Type: SetClientEntityInstanceCommand
 * NameSpace: Engine.System.Client.EntityInstance
 * Type: Command
 */
export const SET_CLIENT_ENTITY_INSTANCE_COMMAND = new CommandType(
    "Engine.System.Client.EntityInstance.SET_CLIENT_ENTITY_INSTANCE_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = SET_CLIENT_ENTITY_INSTANCE_COMMAND;
    public data?: SetClientEntityInstanceCommandData;
}
const instanceOfCommand = new CommandClass();
export const createSetClientEntityInstanceCommand = (
    data: SetClientEntityInstanceCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface SetClientEntityInstanceCommandData {
    clientEntityInstance: IClientEntityInstance;
}
