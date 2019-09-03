import {
    ICommandHandler,
    ICommandResult,
    ICommandType,
} from "../../../core/command";
import { isObjectDefined } from "../../../core/object/ObjectCheck";
import { getGuiFromStore } from "../store/GuiStore";
import {
    LINK_GUI_WITH_COMMAND,
    LinkGuiWithCommandData,
    LinkGuiWithCommandResultType,
} from "./LinkGuiWithCommand";

/**
 * Name: LinkGuiWithCommandHandler
 * Type: Command
 */
export class LinkGuiWithCommandHandler implements ICommandHandler {
    public type: ICommandType = LINK_GUI_WITH_COMMAND;
    public handle({
        id,
        linkWith,
    }: LinkGuiWithCommandData): ICommandResult<LinkGuiWithCommandResultType> {
        const gui = getGuiFromStore(id);
        if (isObjectDefined(gui)) {
            gui.linkWith(linkWith);
        }
        return {
            success: true,
        };
    }
}
