import { ICommand } from "../../../../engine/command/api/ICommand";
import { ICommandType } from "../../../../engine/command/api/ICommandType";
import { CommandType } from "../../../../engine/command/model/CommandType";

/**
 * Type: DisposeOfTrackedEntitiesCommand
 * NameSpace: Entity.Tracked
 * Type: Command
 */
export const DISPOSE_OF_TRACKED_ENTITIES_COMMAND = new CommandType(
    "Entity.Tracked.DISPOSE_OF_TRACKED_ENTITIES_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = DISPOSE_OF_TRACKED_ENTITIES_COMMAND;
    public data?: DisposeOfTrackedEntitiesCommandData;
}
const instanceOfCommand = new CommandClass();
export const createDisposeOfTrackedEntitiesCommand = (
    data: DisposeOfTrackedEntitiesCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface DisposeOfTrackedEntitiesCommandData {}
