import { Mesh } from "babylonjs";
import { Rectangle, TextBlock } from "babylonjs-gui";
import {
    GuiControl,
    GuiControlOptions,
    GuiControlType,
    GuiGridLocation,
} from "../model";

export class GuiLabel implements GuiControl {
    public id: string;
    public options: GuiControlOptions;
    public control: Rectangle;
    public parentId?: string;
    public gridLocation?: GuiGridLocation;
    get type(): GuiControlType {
        return GuiControlType.Label;
    }
    get isVisible(): boolean {
        return this.control.isVisible;
    }
    set isVisible(value: boolean) {
        this.control.isVisible = value;
    }

    constructor(
        id: string,
        options: GuiControlOptions,
        gridLocation?: GuiGridLocation
    ) {
        this.id = id;
        this.options = options;
        this.control = createControl(id, options as GuiLabelControlOptions);
        this.gridLocation = gridLocation;
    }
    public addControl(guiControl: GuiControl) {
        throw new Error("GuiLabel does not support adding of Control.");
    }
    public update(options: GuiLabelControlOptions) {
        const text: TextBlock = this.control.getChildByName(
            `${this.id}-Text`
        ) as TextBlock;
        text.text = options.text;
    }
    public linkWithMesh(mesh: Mesh) {
        this.control.linkWithMesh(mesh);
    }
    public dispose() {
        this.control.dispose();
    }
}

const createControl = (
    idPrefix: string,
    options: GuiLabelControlOptions
): Rectangle => {
    const background = new Rectangle(`${idPrefix}-Background`);
    background.horizontalAlignment = options.alignment;
    background.verticalAlignment = options.vAlignment || 0;
    background.height = `${options.height}px`;
    background.width = `${options.width}px`;
    background.background = options.backgroundColor;
    background.thickness = options.borderThickness;
    background.linkOffsetY = options.linkOffsetY || 0;
    background.isHitTestVisible = false;

    const text1 = new TextBlock(`${idPrefix}-Text`);
    text1.text = options.text;
    text1.color = options.textColor;
    text1.fontSize = options.textSize;
    text1.horizontalAlignment = options.alignment;
    text1.verticalAlignment = options.vAlignment || 0;
    text1.resizeToFit = true;
    background.addControl(text1);

    return background;
};
export interface GuiLabelControlOptions extends GuiControlOptions {
    width: number;
    height: number;
    text: string;
    textSize: number;
    textColor: string;
    backgroundColor: string;
    alignment: 0 | 1 | 2;
    vAlignment?: 0 | 1 | 2;
    borderThickness: number;
    linkOffsetY?: number;
}
