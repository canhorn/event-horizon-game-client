import { ICommandHandler } from "../../../../engine/command/api/ICommandHandler";
import { ICommandResult } from "../../../../engine/command/api/ICommandResult";
import { ICommandType } from "../../../../engine/command/api/ICommandType";
import { MapMeshFromHeightMapEntity } from "../model/MapMeshFromHeightMapEntity";
import {
    CREATE_MAP_FROM_MESH_SETTINGS_COMMAND,
    CreateMapFromMeshSettingsCommandData,
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
    }: CreateMapFromMeshSettingsCommandData): ICommandResult {
        new MapMeshFromHeightMapEntity(mapMeshSettings);
        return {
            success: true,
        };
    }
}
