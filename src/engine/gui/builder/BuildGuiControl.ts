import { assert } from "../../../core/assert/Assert";
import { objectMergeNew } from "../../../core/object/ObjectMergeNew";
import { IGuiControl } from "../api/IGuiControl";
import { IGuiControlOptions } from "../api/IGuiControlOptions";
import { IGuiControlTemplate } from "../api/IGuiControlTemplate";
import { IGuiGridLocation } from "../api/IGuiGridLocation";
import { GuiControlType } from "../model/GuiControlType";
import {
    GuiBar,
    GuiButton,
    GuiContainer,
    GuiGrid,
    GuiInput,
    GuiLabel,
    GuiPanel,
    GuiScrollViewer,
    GuiSpacer,
    GuiText,
} from "../type";

export const buildGuiControl = (
    id: string,
    template: IGuiControlTemplate,
    options?: IGuiControlOptions,
    gridLocation?: IGuiGridLocation
): IGuiControl => {
    assert(id, "Control has to have Id.", "gui_control_needs_id");
    const mergedOptions = objectMergeNew(template.options, options);
    const mergedGridLocation = objectMergeNew(
        template.gridLocation,
        gridLocation
    );
    switch (template.type) {
        case GuiControlType.BAR:
            return new GuiBar(id, mergedOptions, mergedGridLocation);
        case GuiControlType.GRID:
            return new GuiGrid(id, mergedOptions, mergedGridLocation);
        case GuiControlType.LABEL:
            return new GuiLabel(id, mergedOptions, mergedGridLocation);
        case GuiControlType.CONTAINER:
            return new GuiContainer(id, mergedOptions, mergedGridLocation);
        case GuiControlType.PANEL:
            return new GuiPanel(id, mergedOptions, mergedGridLocation);
        case GuiControlType.SPACER:
            return new GuiSpacer(id, mergedOptions, mergedGridLocation);
        case GuiControlType.BUTTON:
            return new GuiButton(id, mergedOptions, mergedGridLocation);
        case GuiControlType.INPUT:
            return new GuiInput(id, mergedOptions, mergedGridLocation);
        case GuiControlType.TEXT:
            return new GuiText(id, mergedOptions, mergedGridLocation);
        case GuiControlType.SCROLL_VIEWER:
            return new GuiScrollViewer(id, mergedOptions, mergedGridLocation);
    }

    throw {
        message: "Not supported Gui Control Type.",
        code: "gui_control_type_not_supported",
    };
};
