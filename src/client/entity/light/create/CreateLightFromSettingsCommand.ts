import { ICommand } from "../../../../engine/command/api/ICommand";
import { ICommandType } from "../../../../engine/command/api/ICommandType";
import { CommandType } from "../../../../engine/command/model/CommandType";
import { ILightSettings } from "../../api/ILightSettings";

/**
 * Type: CreateLightFromSettingsCommand
 * NameSpace: Entity.Light
 * Type: Command
 */
export const CREATE_LIGHT_FROM_SETTINGS_COMMAND = new CommandType(
    "Entity.Light.CREATE_LIGHT_FROM_SETTINGS_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = CREATE_LIGHT_FROM_SETTINGS_COMMAND;
    public data?: CreateLightFromSettingsCommandData;
}
const instanceOfCommand = new CommandClass();
export const createCreateLightFromSettingsCommand = (
    data: CreateLightFromSettingsCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface CreateLightFromSettingsCommandData {
    lightSettings: ILightSettings;
}
