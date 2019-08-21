import { ICommandHandler } from "../../command/api/ICommandHandler";
import { ICommandResult } from "../../command/api/ICommandResult";
import { ICommandType } from "../../command/api/ICommandType";
import { Inject } from "../../ioc/Create";
import { IRenderingGui } from "../../renderer/api/IRenderingGui";
import { GuiControl } from "../model/GuiControl";
import { GuiControlLayout } from "../model/GuiControlLayout";
import { getGuiControl } from "../store/control/GuiControlStore";
import { guiLayoutStore } from "../store/layout/GuiLayoutStore";
import {
    ACTIVATE_LAYOUT_COMMAND,
    ActivateLayoutCommandData,
} from "./ActivateLayoutCommand";

export class ActivateLayoutHandler implements ICommandHandler {
    public type: ICommandType = ACTIVATE_LAYOUT_COMMAND;

    constructor(private _renderingGui: IRenderingGui = Inject(IRenderingGui)) {}

    public handle({
        layoutId,
        parentId,
    }: ActivateLayoutCommandData): ICommandResult {
        const { layoutMap } = guiLayoutStore.state;
        const parent = parentId ? getGuiControl(parentId) : undefined;

        if (layoutMap.containsKey(layoutId)) {
            const layout = layoutMap.getValue(layoutId);
            ((layout && layout.controlList) || [])
                .sort((current, next) => current.sort - next.sort)
                .forEach((layoutChildControl: GuiControlLayout) =>
                    this.addControlToLayout(layoutChildControl, parent)
                );
        }

        return {
            success: true,
        };
    }

    public addControlToLayout = (
        layoutControl: GuiControlLayout,
        parent?: GuiControl
    ) => {
        const control = getGuiControl(layoutControl.id);

        if (!control) {
            return;
        }
        if (layoutControl.layer) {
            control.control.zIndex = layoutControl.layer;
        }
        if (!parent) {
            this._renderingGui.canvas.root.addControl(control.control);
        } else {
            parent.addControl(control);
        }

        (layoutControl.controlList || [])
            .sort((current, next) => current.sort - next.sort)
            .forEach((layoutChildControl: GuiControlLayout) =>
                this.addControlToLayout(layoutChildControl, control)
            );
    };
}
