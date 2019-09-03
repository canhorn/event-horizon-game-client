import { CommandType, ICommand, ICommandType } from "../../../../core/command";
import { ILightSettings } from "../../api/ILightSettings";

/**
 * Name: CreateLightFromSettingsCommand
 * NameSpace: Entity.Light
 * Type: Command
 */
export const CREATE_LIGHT_FROM_SETTINGS_COMMAND = new CommandType(
    "Entity.Light.CREATE_LIGHT_FROM_SETTINGS_COMMAND"
);
class CommandClass
    implements
        ICommand<
            CreateLightFromSettingsCommandData,
            CreateLightFromSettingsCommandResultType
        > {
    public type: ICommandType = CREATE_LIGHT_FROM_SETTINGS_COMMAND;
    public data?: CreateLightFromSettingsCommandData;
}
const instanceOfCommand = new CommandClass();
export const createCreateLightFromSettingsCommand = (
    data: CreateLightFromSettingsCommandData
): ICommand<
    CreateLightFromSettingsCommandData,
    CreateLightFromSettingsCommandResultType
> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface CreateLightFromSettingsCommandData {
    lightSettings: ILightSettings;
}
export type CreateLightFromSettingsCommandResultType = undefined;
