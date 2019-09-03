import {
    ICommandHandler,
    ICommandResult,
    ICommandType,
} from "../../../../core/command";
import { HemisphericLightEntity } from "../model/HemisphericLightEntity";
import { PointLightEntity } from "../model/PointLightEntity";
import {
    CREATE_LIGHT_FROM_SETTINGS_COMMAND,
    CreateLightFromSettingsCommandData,
    CreateLightFromSettingsCommandResultType,
} from "./CreateLightFromSettingsCommand";

/**
 * Name: CreateLightFromSettingsCommandHandler
 * Type: Command
 */
export class CreateLightFromSettingsCommandHandler implements ICommandHandler {
    public type: ICommandType = CREATE_LIGHT_FROM_SETTINGS_COMMAND;
    constructor() {}
    public handle({
        lightSettings,
    }: CreateLightFromSettingsCommandData): ICommandResult<
        CreateLightFromSettingsCommandResultType
    > {
        switch (lightSettings.type) {
            case "hemispheric":
                new HemisphericLightEntity(lightSettings);
                break;
            case "point":
                new PointLightEntity(lightSettings);
                break;

            default:
                break;
        }
        return {
            success: true,
        };
    }
}
