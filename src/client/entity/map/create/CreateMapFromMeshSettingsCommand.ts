import { ICommand } from "../../../../engine/command/api/ICommand";
import { ICommandType } from "../../../../engine/command/api/ICommandType";
import { CommandType } from "../../../../engine/command/model/CommandType";
import { IMapMeshSettings } from "../../api/IMapMeshSettings";

/**
 * Type: CreateMapFromMeshSettingsCommand
 * NameSpace: Entity.Map
 * Type: Command
 */
export const CREATE_MAP_FROM_MESH_SETTINGS_COMMAND = new CommandType(
    "Entity.Map.CREATE_MAP_FROM_MESH_SETTINGS_COMMAND"
);
class CommandClass implements ICommand {
    public type: ICommandType = CREATE_MAP_FROM_MESH_SETTINGS_COMMAND;
    public data?: CreateMapFromMeshSettingsCommandData;
}
const instanceOfCommand = new CommandClass();
export const createCreateMapFromMeshSettingsCommand = (
    data: CreateMapFromMeshSettingsCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface CreateMapFromMeshSettingsCommandData {
    mapMeshSettings: IMapMeshSettings;
}
