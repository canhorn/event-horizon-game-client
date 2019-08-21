import { GuiControlType } from "../model/GuiControlType";
import { addGuiTemplate } from "./template/GuiTemplateStore";

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
    addGuiTemplate({
        id: "platform-bar",
        type: GuiControlType.Bar,
        options: {
            text: "- / -",
            backgroundColor: "gray",
            barColor: "white",
        },
    });
};

const createPlatformButtonControl = () => {
    addGuiTemplate({
        id: "platform-button",
        type: GuiControlType.Button,
        options: {
            height: "50px",
            width: "50px",
            text: "----",
            textSize: 12,
            textColor: "white",
            backgroundColor: "black",
            alignment: 2,
            vAlignment: 2,
            onClick: () => {
                // NoOp: Ignore the click
            },
        },
    });
};

const createPlatformContainerControl = () => {
    addGuiTemplate({
        id: "platform-container",
        type: GuiControlType.Container,
        options: {
            background: "gray",
        },
    });
};

const createPlatformGridControl = () => {
    addGuiTemplate({
        id: "platform-grid",
        type: GuiControlType.Grid,
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
    addGuiTemplate({
        id: "platform-input",
        type: GuiControlType.Input,
        options: {
            onClick: () => {
                // Do nothing
            },
        },
    });
};

const createPlatformLabelControl = () => {
    addGuiTemplate({
        id: "platform-label",
        type: GuiControlType.Label,
        options: {
            text: "-----",
        },
    });
};

const createPlatformPanelControl = () => {
    addGuiTemplate({
        id: "platform-panel",
        type: GuiControlType.Panel,
        options: {
            isHitTestVisible: true,
        },
    });
};

const createPlatformScrollViewerControl = () => {
    addGuiTemplate({
        id: "platform-scroll_viewer",
        type: GuiControlType.ScrollViewer,
        options: {},
    });
};

const createPlatformSpacerControl = () => {
    addGuiTemplate({
        id: "platform-spacer",
        type: GuiControlType.Spacer,
        options: {
            padding: 5,
        },
    });
};

const createPlatformTextControl = () => {
    addGuiTemplate({
        id: "platform-text",
        type: GuiControlType.Text,
        options: {
            color: "white",
            fontSize: "1em",
            text: "------",
        },
    });
};
