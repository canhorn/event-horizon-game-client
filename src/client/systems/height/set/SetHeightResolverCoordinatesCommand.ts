import { CommandType, ICommand, ICommandType } from "../../../../core/command";
import { IHeightCoordinates } from "../api/IHeightCoordinates";

/**
 * Name: SetHeightResolverCoordinatesCommand
 * NameSpace: System.Height
 * Type: Command
 */
export const SET_HEIGHT_RESOLVER_COORDINATES_COMMAND = new CommandType(
    "System.Height.SET_HEIGHT_RESOLVER_COORDINATES_COMMAND"
);
class CommandClass
    implements
        ICommand<
            SetHeightResolverCoordinatesCommandData,
            SetHeightResolverCoordinatesCommandResultType
        > {
    public type: ICommandType = SET_HEIGHT_RESOLVER_COORDINATES_COMMAND;
    public data?: SetHeightResolverCoordinatesCommandData;
}
const instanceOfCommand = new CommandClass();
export const createSetHeightResolverCoordinatesCommand = (
    data: SetHeightResolverCoordinatesCommandData
): ICommand<
    SetHeightResolverCoordinatesCommandData,
    SetHeightResolverCoordinatesCommandResultType
> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface SetHeightResolverCoordinatesCommandData {
    heightCoordinates: IHeightCoordinates;
}
export type SetHeightResolverCoordinatesCommandResultType = undefined;
