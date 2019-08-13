import { ICommandHandler } from "../../command/api/ICommandHandler";
import { ICommandResult } from "../../command/api/ICommandResult";
import { ICommandService } from "../../command/api/ICommandService";
import { ICommandType } from "../../command/api/ICommandType";
import { Inject } from "../../ioc/Create";
import { GuiControlLayout } from "../model/GuiControlLayout";
import { getGuiControl } from "../store/control/GuiControlStore";
import { guiLayoutStore } from "../store/layout/GuiLayoutStore";
import { createDisposeOfGuiControlCommand } from "./DisposeOfGuiControlCommand";
import {
    DISPOSE_OF_GUI_LAYOUT_COMMAND,
    DisposeOfGuiLayoutCommandData,
} from "./DisposeOfGuiLayoutCommand";

export class DisposeOfGuiLayoutCommandHandler implements ICommandHandler {
    public type: ICommandType = DISPOSE_OF_GUI_LAYOUT_COMMAND;

    constructor(
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        )
    ) {}

    public handle({ layoutId }: DisposeOfGuiLayoutCommandData): ICommandResult {
        const { layoutMap } = guiLayoutStore.state;

        if (layoutMap.containsKey(layoutId)) {
            const layout = layoutMap.getValue(layoutId);
            ((layout && layout.controlList) || [])
                .sort((current, next) => current.sort - next.sort)
                .forEach(layoutControl => this.disposeOfControl(layoutControl));
        }

        return {
            success: true,
        };
    }

    public disposeOfControl(layoutControl: GuiControlLayout): void {
        const control = getGuiControl(layoutControl.id);
        if (control) {
            this._commandService.send(
                createDisposeOfGuiControlCommand({ controlId: control.id })
            );
        }
    }
}
