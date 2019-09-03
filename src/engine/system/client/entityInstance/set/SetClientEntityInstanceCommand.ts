import { CommandType, ICommand, ICommandType } from "../../../../../core/command";
import { IClientEntityInstance } from "../api/IClientEntityInstance";

/**
 * Name: SetClientEntityInstanceCommand
 * NameSpace:Engine.System.Client.EntityInstance
 * Type: Command
 */
export const SET_CLIENT_ENTITY_INSTANCE_COMMAND = new CommandType(
    "Engine.System.Client.EntityInstance.SET_CLIENT_ENTITY_INSTANCE_COMMAND"
);
class CommandClass
    implements
        ICommand<
            SetClientEntityInstanceCommandData,
            SetClientEntityInstanceCommandResultType
        > {
    public type: ICommandType = SET_CLIENT_ENTITY_INSTANCE_COMMAND;
    public data?: SetClientEntityInstanceCommandData;
}
const instanceOfCommand = new CommandClass();
export const createSetClientEntityInstanceCommand = (
    data: SetClientEntityInstanceCommandData
): ICommand<
    SetClientEntityInstanceCommandData,
    SetClientEntityInstanceCommandResultType
> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface SetClientEntityInstanceCommandData {
    clientEntityInstance: IClientEntityInstance;
}
export type SetClientEntityInstanceCommandResultType = undefined;
