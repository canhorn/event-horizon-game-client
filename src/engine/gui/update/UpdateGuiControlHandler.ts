import { ICommandHandler } from "../../command/api/ICommandHandler";
import { ICommandResult } from "../../command/api/ICommandResult";
import { ICommandType } from "../../command/api/ICommandType";
import { getGuiControl } from "../store/control/GuiControlStore";
import {
    UPDATE_GUI_CONTROL_COMMAND,
    UpdateGuiControlCommandData,
} from "./UpdateGuiControlCommand";

export class UpdateGuiControlHandler implements ICommandHandler {
    public type: ICommandType = UPDATE_GUI_CONTROL_COMMAND;

    public handle({
        controlId,
        options,
    }: UpdateGuiControlCommandData): ICommandResult {
        const control = getGuiControl(controlId);
        if (control) {
            control.update(options);
        }

        return {
            success: true,
        };
    }
}
