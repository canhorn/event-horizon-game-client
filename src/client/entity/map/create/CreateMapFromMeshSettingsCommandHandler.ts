import {
    ICommandHandler,
    ICommandResult,
    ICommandType,
} from "../../../../core/command";
import { MapMeshFromHeightMapEntity } from "../model/MapMeshFromHeightMapEntity";
import {
    CREATE_MAP_FROM_MESH_SETTINGS_COMMAND,
    CreateMapFromMeshSettingsCommandData,
    CreateMapFromMeshSettingsCommandResultType,
} from "./CreateMapFromMeshSettingsCommand";

/**
 * Name: CreateMapFromMeshSettingsCommand
 * Type: Command
 */
export class CreateMapFromMeshSettingsCommandHandler
    implements ICommandHandler {
    public type: ICommandType = CREATE_MAP_FROM_MESH_SETTINGS_COMMAND;
    constructor() {}
    public handle({
        mapMeshSettings,
    }: CreateMapFromMeshSettingsCommandData): ICommandResult<
        CreateMapFromMeshSettingsCommandResultType
    > {
        new MapMeshFromHeightMapEntity(mapMeshSettings);
        return {
            success: true,
        };
    }
}
