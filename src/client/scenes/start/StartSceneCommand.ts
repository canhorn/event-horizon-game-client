import { ICommand } from "../../../engine/command/api/ICommand";
import { ICommandType } from "../../../engine/command/api/ICommandType";
import { CommandType } from "../../../engine/command/model/CommandType";

/**
 * Type: StartSceneCommand
 * NameSpace: ClientScenes
 * Type: Command
 */
export const START_SCENE_COMMAND = new CommandType(
    "ClientScenes.START_SCENE_COMMAND"
);
export class CommandClass implements ICommand {
    public type: ICommandType = START_SCENE_COMMAND;
    public data?: StartSceneCommandData;
}
const instanceOfCommand = new CommandClass();
export const createStartSceneCommand = (
    data: StartSceneCommandData
): ICommand => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface StartSceneCommandData {
    sceneId: string;
}
