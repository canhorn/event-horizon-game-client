import {
    ICommandHandler,
    ICommandResult,
    ICommandType,
} from "../../../core/command";
import { isObjectDefined } from "../../../core/object/ObjectCheck";
import { buildGuiControl } from "../builder/BuildGuiControl";
import {
    getGuiControlFromStore,
    setGuiControlInStore,
} from "../store/control/GuiControlStore";
import { getGuiControlTemplate } from "../store/template/GuiControlTemplateStore";
import {
    REGISTER_GUI_CONTROL_COMMAND,
    RegisterGuiControlCommandData,
    RegisterGuiControlCommandResultType,
} from "./RegisterGuiControlCommand";

/**
 * Name: RegisterGuiControlCommandHandler
 * Type: Command
 */
export class RegisterGuiControlCommandHandler implements ICommandHandler {
    public type: ICommandType = REGISTER_GUI_CONTROL_COMMAND;
    public handle({
        guiId,
        control,
    }: RegisterGuiControlCommandData): ICommandResult<
        RegisterGuiControlCommandResultType
    > {
        const storedControl = getGuiControlFromStore(guiId, control.id);
        if (isObjectDefined(storedControl)) {
            return {
                success: false,
                result: "gui_control_already_registered",
            };
        }
        const template = getGuiControlTemplate(control.templateId);
        if (!template) {
            return {
                success: false,
                result: "gui_control_template_not_found",
            };
        }
        const builtControl = buildGuiControl(
            control.id,
            template,
            control.options,
            control.gridLocation
        );
        setGuiControlInStore(guiId, builtControl);
        if (isObjectDefined(control.linkWith)) {
            builtControl.linkWith(control.linkWith);
        }
        return {
            success: true,
        };
    }
}
