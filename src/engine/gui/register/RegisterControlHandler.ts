import { ICommandHandler } from "../../command/api/ICommandHandler";
import { ICommandResult } from "../../command/api/ICommandResult";
import { ICommandType } from "../../command/api/ICommandType";
import { Inject } from "../../ioc/Create";
import { IRenderingGui } from "../../renderer/api/IRenderingGui";
import { buildGuiControl } from "../builder/BuildGuiControl";
import { addGuiControl, getGuiControl } from "../store/control/GuiControlStore";
import { getGuiTemplate } from "../store/template/GuiTemplateStore";
import {
    REGISTER_CONTROL_COMMAND,
    RegisterControlCommandData,
} from "./RegisterControlCommand";

export class RegisterControlHandler implements ICommandHandler {
    public type: ICommandType = REGISTER_CONTROL_COMMAND;

    constructor(
        private readonly _renderingGui: IRenderingGui = Inject(IRenderingGui)
    ) {}

    public handle({
        controlId,
        templateId,
        options,
        gridLocation,
    }: RegisterControlCommandData): ICommandResult {
        const control = getGuiControl(controlId);
        if (control) {
            control.dispose();
        }
        const template = getGuiTemplate(templateId);
        if (!template) {
            return {
                success: false,
                result: "template_not_found",
            };
        }
        addGuiControl(
            buildGuiControl(controlId, template, options, gridLocation)
        );
        return {
            success: true,
        };
    }
}
