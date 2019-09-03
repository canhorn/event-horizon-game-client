import { CommandType, ICommand, ICommandType } from "../../../../core/command";

/**
 * Name: DisposeOfTrackedEntitiesCommand
 * NameSpace: Entity.Tracked
 * Type: Command
 */
export const DISPOSE_OF_TRACKED_ENTITIES_COMMAND = new CommandType(
    "Entity.Tracked.DISPOSE_OF_TRACKED_ENTITIES_COMMAND"
);
class CommandClass
    implements
        ICommand<
            DisposeOfTrackedEntitiesCommandData,
            DisposeOfTrackedEntitiesCommandResultType
        > {
    public type: ICommandType = DISPOSE_OF_TRACKED_ENTITIES_COMMAND;
    public data?: DisposeOfTrackedEntitiesCommandData;
}
const instanceOfCommand = new CommandClass();
export const createDisposeOfTrackedEntitiesCommand = (
    data: DisposeOfTrackedEntitiesCommandData
): ICommand<
    DisposeOfTrackedEntitiesCommandData,
    DisposeOfTrackedEntitiesCommandResultType
> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface DisposeOfTrackedEntitiesCommandData {}
export type DisposeOfTrackedEntitiesCommandResultType = undefined;
