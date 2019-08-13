import { ICommandHandler } from "../../command/api/ICommandHandler";
import { ICommandResult } from "../../command/api/ICommandResult";
import { ICommandType } from "../../command/api/ICommandType";
import { Inject } from "../../ioc/Create";
import { IRenderingGui } from "../../renderer/api/IRenderingGui";
import {
    getGuiControl,
    removeGuiControl,
} from "../store/control/GuiControlStore";
import {
    DISPOSE_OF_GUI_CONTROL_COMMAND,
    DisposeOfGuiControlCommandData,
} from "./DisposeOfGuiControlCommand";

export class DisposeOfGuiControlHandler implements ICommandHandler {
    public type: ICommandType = DISPOSE_OF_GUI_CONTROL_COMMAND;

    constructor(
        private readonly renderingGui: IRenderingGui = Inject(IRenderingGui)
    ) {}

    public handle({
        controlId,
    }: DisposeOfGuiControlCommandData): ICommandResult {
        const control = getGuiControl(controlId);
        if (control) {
            control.dispose();
            removeGuiControl(controlId);
        }

        return {
            success: true,
        };
    }
}
