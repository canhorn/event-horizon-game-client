import { ICommandHandler } from "../../command/api/ICommandHandler";
import { ICommandResult } from "../../command/api/ICommandResult";
import { ICommandType } from "../../command/api/ICommandType";
import { GuiControlLayout } from "../model/GuiControlLayout";
import { getGuiControl } from "../store/control/GuiControlStore";
import { guiLayoutStore } from "../store/layout/GuiLayoutStore";
import {
    SHOW_LAYOUT_COMMAND,
    ShowLayoutCommandData,
} from "./ShowLayoutCommand";

export class ShowLayoutCommandHandler implements ICommandHandler {
    public type: ICommandType = SHOW_LAYOUT_COMMAND;

    public handle({ layoutId }: ShowLayoutCommandData): ICommandResult {
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
            control.isVisible = true;
        }
    }
}
