import { Mesh } from "babylonjs";
import {
    ICommandHandler,
    ICommandResult,
    ICommandType,
} from "../../../core/command";
import {
    isObjectDefined,
    isObjectNotDefined,
} from "../../../core/object/ObjectCheck";
import { getGuiControlFromStore } from "../store/control/GuiControlStore";
import {
    UPDATE_GUI_CONTROL_COMMAND,
    UpdateGuiControlCommandData,
    UpdateGuiControlCommandResultType,
} from "./UpdateGuiControlCommand";

/**
 * Name: UpdateGuiControlCommandHandler
 * Type: Command
 */
export class UpdateGuiControlCommandHandler implements ICommandHandler {
    public type: ICommandType = UPDATE_GUI_CONTROL_COMMAND;
    public handle({
        guiId,
        control,
    }: UpdateGuiControlCommandData): ICommandResult<
        UpdateGuiControlCommandResultType
    > {
        const guiControl = getGuiControlFromStore(guiId, control.controlId);
        if (isObjectNotDefined(guiControl)) {
            return { success: false, result: "gui_control_was_not_found" };
        }
        if (isObjectDefined(control.isVisible)) {
            guiControl.isVisible = control.isVisible;
        }
        if (isObjectDefined(control.options)) {
            guiControl.update(control.options);
        }
        if (isObjectDefined(control.linkWith)) {
            guiControl.linkWith(control.linkWith as Mesh);
        }
        return {
            success: true,
        };
    }
}
