import {
    ICommandHandler,
    ICommandResult,
    ICommandType,
} from "../../../core/command";
import { isObjectDefined } from "../../../core/object/ObjectCheck";
import { getGuiFromStore } from "../store/GuiStore";
import {
    HIDE_GUI_COMMAND,
    HideGuiCommandData,
    HideGuiCommandResultType,
} from "./HideGuiCommand";

/**
 * Name: HideGuiCommandHandler
 * Type: Command
 */
export class HideGuiCommandHandler implements ICommandHandler {
    public type: ICommandType = HIDE_GUI_COMMAND;
    public handle({
        id,
    }: HideGuiCommandData): ICommandResult<HideGuiCommandResultType> {
        const gui = getGuiFromStore(id);
        if (isObjectDefined(gui)) {
            gui.hide();
        }
        return {
            success: true,
        };
    }
}
