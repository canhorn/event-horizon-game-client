import {
    ICommandHandler,
    ICommandResult,
    ICommandType,
} from "../../../core/command";
import { Inject } from "../../../core/ioc/api/Inject";
import { IRenderingGui } from "../../renderer/api/IRenderingGui";
import { IGuiControl } from "../api/IGuiControl";
import { IGuiLayoutControlData } from "../api/IGuiLayoutControlData";
import {
    getGuiControlFromStore,
    getGuiControlFromStoreByGeneratedId,
} from "../store/control/GuiControlStore";
import {
    SETUP_GUI_LAYOUT_COMMAND,
    SetupGuiLayoutCommandData,
    SetupGuiLayoutCommandResultType,
} from "./SetupGuiLayoutCommand";

/**
 * Name: SetupGuiLayoutCommandHandler
 * Type: Command
 */
export class SetupGuiLayoutCommandHandler implements ICommandHandler {
    public type: ICommandType = SETUP_GUI_LAYOUT_COMMAND;
    constructor(
        private readonly _renderingGui: IRenderingGui = Inject(IRenderingGui)
    ) {}
    public handle({
        guiId,
        layout,
        parentControlId,
    }: SetupGuiLayoutCommandData): ICommandResult<
        SetupGuiLayoutCommandResultType
    > {
        const parent = parentControlId
            ? getGuiControlFromStoreByGeneratedId(parentControlId)
            : undefined;

        layout.controlList
            .sort((current, next) => current.sort - next.sort)
            .forEach(layoutChildControl =>
                this.addControlToLayout(guiId, layoutChildControl, parent)
            );

        return {
            success: true,
        };
    }

    public addControlToLayout = (
        guiId: string,
        layoutControl: IGuiLayoutControlData,
        parent?: IGuiControl
    ) => {
        const control = getGuiControlFromStore(guiId, layoutControl.id);

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
            .forEach(layoutChildControl =>
                this.addControlToLayout(guiId, layoutChildControl, control)
            );
    };
}
