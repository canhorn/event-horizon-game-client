import { CommandType, ICommand, ICommandType } from "../../../../core/command";

/**
 * Name: DisposeOfTrackedEntityCommand
 * NameSpace: Entity.Tracked
 * Type: Command
 */
export const DISPOSE_OF_TRACKED_ENTITY_COMMAND = new CommandType(
    "Entity.Tracked.DISPOSE_OF_TRACKED_ENTITY_COMMAND"
);
class CommandClass
    implements
        ICommand<
            DisposeOfTrackedEntityCommandData,
            DisposeOfTrackedEntityCommandResultType
        > {
    public type: ICommandType = DISPOSE_OF_TRACKED_ENTITY_COMMAND;
    public data?: DisposeOfTrackedEntityCommandData;
}
const instanceOfCommand = new CommandClass();
export const createDisposeOfTrackedEntityCommand = (
    data: DisposeOfTrackedEntityCommandData
): ICommand<
    DisposeOfTrackedEntityCommandData,
    DisposeOfTrackedEntityCommandResultType
> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface DisposeOfTrackedEntityCommandData {
    entityId: number;
}
export type DisposeOfTrackedEntityCommandResultType = undefined;
