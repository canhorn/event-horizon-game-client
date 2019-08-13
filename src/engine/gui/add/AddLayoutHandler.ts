import { ICommandHandler } from "../../command/api/ICommandHandler";
import { ICommandResult } from "../../command/api/ICommandResult";
import { ICommandType } from "../../command/api/ICommandType";
import { addGuiLayout } from "../store/layout/GuiLayoutStore";
import { ADD_LAYOUT_COMMAND, AddLayoutCommandData } from "./AddLayoutCommand";

export class AddLayoutHandler implements ICommandHandler {
    public type: ICommandType = ADD_LAYOUT_COMMAND;

    constructor() {}

    public handle({ layout }: AddLayoutCommandData): ICommandResult {
        addGuiLayout(layout);

        return {
            success: true,
        };
    }
}
