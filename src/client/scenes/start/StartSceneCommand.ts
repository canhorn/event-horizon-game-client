import { CommandType, ICommand, ICommandType } from "../../../core/command";

/**
 * Name: StartSceneCommand
 * NameSpace: Scenes
 * Type: Command
 */
export const START_SCENE_COMMAND = new CommandType(
    "Scenes.START_SCENE_COMMAND"
);
class CommandClass
    implements ICommand<StartSceneCommandData, StartSceneCommandResultType> {
    public type: ICommandType = START_SCENE_COMMAND;
    public data?: StartSceneCommandData;
}
const instanceOfCommand = new CommandClass();
export const createStartSceneCommand = (
    data: StartSceneCommandData
): ICommand<StartSceneCommandData, StartSceneCommandResultType> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface StartSceneCommandData {
    sceneId: string;
}
export type StartSceneCommandResultType = undefined;
