import { ICommandHandler, ICommandType } from "../../../core/command";
import { ICommandResult } from "../../../core/command/api/ICommandResult";
import { isObjectDefined } from "../../../core/object/ObjectCheck";
import { getGuiFromStore } from "../store/GuiStore";
import {
    ACTIVATE_GUI_COMMAND,
    ActivateGuiCommandData,
    ActivateGuiCommandResultType,
} from "./ActivateGuiCommand";

/**
 * Name: ActivateGuiCommandHandler
 * Type: Command
 */
export class ActivateGuiCommandHandler implements ICommandHandler {
    public type: ICommandType = ACTIVATE_GUI_COMMAND;
    public handle({
        id,
    }: ActivateGuiCommandData): ICommandResult<ActivateGuiCommandResultType> {
        const gui = getGuiFromStore(id);
        if (isObjectDefined(gui)) {
            gui.activate();
        }
        return {
            success: true,
        };
    }
}
