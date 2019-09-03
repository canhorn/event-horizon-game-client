import {
    ICommandHandler,
    ICommandResult,
    ICommandType,
} from "../../../core/command";
import { isObjectDefined } from "../../../core/object/ObjectCheck";
import { getGuiFromStore } from "../store/GuiStore";
import {
    DISPOSE_OF_GUI_COMMAND,
    DisposeOfGuiCommandData,
    DisposeOfGuiCommandResultType,
} from "./DisposeOfGuiCommand";

/**
 * Name: DisposeOfGuiCommandHandler
 * Type: Command
 */
export class DisposeOfGuiCommandHandler implements ICommandHandler {
    public type: ICommandType = DISPOSE_OF_GUI_COMMAND;
    public handle({
        id,
    }: DisposeOfGuiCommandData): ICommandResult<DisposeOfGuiCommandResultType> {
        const gui = getGuiFromStore(id);
        if (isObjectDefined(gui)) {
            gui.dispose();
        }
        return {
            success: true,
        };
    }
}
