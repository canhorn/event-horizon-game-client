import { objectMergeNew } from "../../../core/object/ObjectMergeNew";
import { assert } from "../../assert/Assert";
import {
    GuiControl,
    GuiControlOptions,
    GuiControlType,
    GuiGridLocation,
    GuiTemplate,
} from "../model";
import {
    GuiBar,
    GuiButton,
    GuiContainer,
    GuiGrid,
    GuiInput,
    GuiLabel,
    GuiPanel,
    GuiSpacer,
    GuiText,
} from "../type";

export const buildGuiControl = (
    id: string,
    template: GuiTemplate,
    options?: GuiControlOptions,
    gridLocation?: GuiGridLocation
): GuiControl => {
    assert(id, "Control has to have Id.", "gui_control_needs_id");
    const mergedOptions = objectMergeNew(template.options, options);
    const mergedGridLocation = objectMergeNew(
        template.gridLocation,
        gridLocation
    );
    switch (template.type) {
        case GuiControlType.Bar:
            return new GuiBar(id, mergedOptions, mergedGridLocation);
        case GuiControlType.Grid:
            return new GuiGrid(id, mergedOptions, mergedGridLocation);
        case GuiControlType.Label:
            return new GuiLabel(id, mergedOptions, mergedGridLocation);
        case GuiControlType.Container:
            return new GuiContainer(id, mergedOptions, mergedGridLocation);
        case GuiControlType.Panel:
            return new GuiPanel(id, mergedOptions, mergedGridLocation);
        case GuiControlType.Spacer:
            return new GuiSpacer(id, mergedOptions, mergedGridLocation);
        case GuiControlType.Button:
            return new GuiButton(id, mergedOptions, mergedGridLocation);
        case GuiControlType.Input:
            return new GuiInput(id, mergedOptions, mergedGridLocation);
        case GuiControlType.Text:
            return new GuiText(id, mergedOptions, mergedGridLocation);
    }

    throw {
        message: "Not supported Gui Control Type.",
        code: "gui_control_type_not_supported",
    };
};
