import { CommandType, ICommand, ICommandType } from "../../../../core/command";
import { IMapMeshSettings } from "../../api/IMapMeshSettings";

/**
 * Name: CreateMapFromMeshSettingsCommand
 * NameSpace: Entity.Map
 * Type: Command
 */
export const CREATE_MAP_FROM_MESH_SETTINGS_COMMAND = new CommandType(
    "Entity.Map.CREATE_MAP_FROM_MESH_SETTINGS_COMMAND"
);
class CommandClass
    implements
        ICommand<
            CreateMapFromMeshSettingsCommandData,
            CreateMapFromMeshSettingsCommandResultType
        > {
    public type: ICommandType = CREATE_MAP_FROM_MESH_SETTINGS_COMMAND;
    public data?: CreateMapFromMeshSettingsCommandData;
}
const instanceOfCommand = new CommandClass();
export const createCreateMapFromMeshSettingsCommand = (
    data: CreateMapFromMeshSettingsCommandData
): ICommand<
    CreateMapFromMeshSettingsCommandData,
    CreateMapFromMeshSettingsCommandResultType
> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface CreateMapFromMeshSettingsCommandData {
    mapMeshSettings: IMapMeshSettings;
}
export type CreateMapFromMeshSettingsCommandResultType = undefined;
