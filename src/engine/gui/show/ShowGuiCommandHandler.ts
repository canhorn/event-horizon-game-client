import {
    ICommandHandler,
    ICommandResult,
    ICommandType,
} from "../../../core/command";
import { isObjectDefined } from "../../../core/object/ObjectCheck";
import { getGuiFromStore } from "../store/GuiStore";
import {
    SHOW_GUI_COMMAND,
    ShowGuiCommandData,
    ShowGuiCommandResultType,
} from "./ShowGuiCommand";

/**
 * Name: ShowGuiCommandHandler
 * Type: Command
 */
export class ShowGuiCommandHandler implements ICommandHandler {
    public type: ICommandType = SHOW_GUI_COMMAND;
    public handle({
        id,
    }: ShowGuiCommandData): ICommandResult<ShowGuiCommandResultType> {
        const gui = getGuiFromStore(id);
        if (isObjectDefined(gui)) {
            gui.show();
        }
        return {
            success: true,
        };
    }
}
