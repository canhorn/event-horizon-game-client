import { ICommand } from "../../../../engine/command/api/ICommand";
import { ICommandType } from "../../../../engine/command/api/ICommandType";
import { CommandType } from "../../../../engine/command/model/CommandType";

/**
 * Type: DisposeOfTrackedEntityCommand
 * NameSpace: Entity.Tracked
 * Type: Command
 */
export const DISPOSE_OF_TRACKED_ENTITY_COMMAND = new CommandType(
    "Entity.Tracked.DISPOSE_OF_TRACKED_ENTITY_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = DISPOSE_OF_TRACKED_ENTITY_COMMAND;
    public data?: DisposeOfTrackedEntityCommandData;
}
const instanceOfCommand = new CommandClass();
export const createDisposeOfTrackedEntityCommand = (
    data: DisposeOfTrackedEntityCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface DisposeOfTrackedEntityCommandData {
    entityId: number;
}
