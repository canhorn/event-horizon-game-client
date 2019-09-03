import { GuiControlType } from "../model/GuiControlType";
import { addGuiControlTemplate } from "./template/GuiControlTemplateStore";

export const initializePlatformGuiState = () => {
    createPlatformBarControl();
    createPlatformButtonControl();
    createPlatformContainerControl();
    createPlatformGridControl();
    createPlatformInputControl();
    createPlatformLabelControl();
    createPlatformPanelControl();
    createPlatformScrollViewerControl();
    createPlatformSpacerControl();
    createPlatformTextControl();
};

const createPlatformBarControl = () => {
    addGuiControlTemplate({
        id: "platform-bar",
        type: GuiControlType.BAR,
        options: {
            text: "- / -",
            backgroundColor: "gray",
            barColor: "white",
        },
    });
};

const createPlatformButtonControl = () => {
    addGuiControlTemplate({
        id: "platform-button",
        type: GuiControlType.BUTTON,
        options: {
            height: "50px",
            width: "50px",
            text: "----",
            fontSize: 12,
            color: "white",
            background: "black",
            alignment: 2,
            vAlignment: 2,
            onClick: () => {
                // NoOp: Ignore the click
            },
        },
    });
};

const createPlatformContainerControl = () => {
    addGuiControlTemplate({
        id: "platform-container",
        type: GuiControlType.CONTAINER,
        options: {
            background: "gray",
        },
    });
};

const createPlatformGridControl = () => {
    addGuiControlTemplate({
        id: "platform-grid",
        type: GuiControlType.GRID,
        options: {
            column: 1,
            row: 1,
            backgroundColor: "transparent",
            paddingBottom: 0,
            paddingTop: 0,
            paddingLeft: 0,
            paddingRight: 0,
        },
    });
};

const createPlatformInputControl = () => {
    addGuiControlTemplate({
        id: "platform-input",
        type: GuiControlType.INPUT,
        options: {
            onClick: () => {
                // Do nothing
            },
        },
    });
};

const createPlatformLabelControl = () => {
    addGuiControlTemplate({
        id: "platform-label",
        type: GuiControlType.LABEL,
        options: {
            text: "-----",
        },
    });
};

const createPlatformPanelControl = () => {
    addGuiControlTemplate({
        id: "platform-panel",
        type: GuiControlType.PANEL,
        options: {
            isHitTestVisible: true,
        },
    });
};

const createPlatformScrollViewerControl = () => {
    addGuiControlTemplate({
        id: "platform-scroll_viewer",
        type: GuiControlType.SCROLL_VIEWER,
        options: {},
    });
};

const createPlatformSpacerControl = () => {
    addGuiControlTemplate({
        id: "platform-spacer",
        type: GuiControlType.SPACER,
        options: {
            padding: 5,
        },
    });
};

const createPlatformTextControl = () => {
    addGuiControlTemplate({
        id: "platform-text",
        type: GuiControlType.TEXT,
        options: {
            color: "white",
            fontSize: "1em",
            text: "------",
        },
    });
};
