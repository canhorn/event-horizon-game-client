import { ICommand } from "../../../../engine/command/api/ICommand";
import { ICommandType } from "../../../../engine/command/api/ICommandType";
import { CommandType } from "../../../../engine/command/model/CommandType";
import { IHeightCoordinates } from "../api/IHeightCoordinates";

/**
 * Type: SetHeightResolverCoordinatesCommand
 * NameSpace: System.Height
 * Type: Command
 */
export const SET_HEIGHT_RESOLVER_COORDINATES_COMMAND = new CommandType(
    "System.Height.SET_HEIGHT_RESOLVER_COORDINATES_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = SET_HEIGHT_RESOLVER_COORDINATES_COMMAND;
    public data?: SetHeightResolverCoordinatesCommandData;
}
const instanceOfCommand = new CommandClass();
export const createSetHeightResolverCoordinatesCommand = (
    data: SetHeightResolverCoordinatesCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface SetHeightResolverCoordinatesCommandData {
    heightCoordinates: IHeightCoordinates;
}
