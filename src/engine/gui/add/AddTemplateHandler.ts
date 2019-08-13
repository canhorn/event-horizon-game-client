import { ICommandHandler } from "../../command/api/ICommandHandler";
import { ICommandResult } from "../../command/api/ICommandResult";
import { ICommandType } from "../../command/api/ICommandType";
import { Inject } from "../../ioc/Create";
import { IRenderingGui } from "../../renderer/api/IRenderingGui";
import { addGuiTemplate } from "../store/template/GuiTemplateStore";
import {
    ADD_TEMPLATE_COMMAND,
    AddTemplateCommandData,
} from "./AddTemplateCommand";

export class AddTemplateHandler implements ICommandHandler {
    public type: ICommandType = ADD_TEMPLATE_COMMAND;

    constructor(private _renderingGui: IRenderingGui = Inject(IRenderingGui)) {}

    public handle({ template }: AddTemplateCommandData): ICommandResult {
        addGuiTemplate(template);

        return {
            success: true,
        };
    }
}
