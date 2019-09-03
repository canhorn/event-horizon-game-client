import { Mesh } from "babylonjs";
import { Rectangle, TextBlock } from "babylonjs-gui";
import { IGuiControl, IGuiControlOptions, IGuiGridLocation } from "../api";
import { GuiControlType } from "../model/GuiControlType";

export class GuiLabel implements IGuiControl {
    public id: string;
    public options: IGuiControlOptions;
    public control: Rectangle;
    public parentId?: string;
    public gridLocation?: IGuiGridLocation;
    get type(): GuiControlType {
        return GuiControlType.LABEL;
    }
    get isVisible(): boolean {
        return this.control.isVisible;
    }
    set isVisible(value: boolean) {
        this.control.isVisible = value;
    }

    constructor(
        id: string,
        options: IGuiControlOptions,
        gridLocation?: IGuiGridLocation
    ) {
        this.id = id;
        this.options = options;
        this.control = createControl(id, options as GuiLabelControlOptions);
        this.gridLocation = gridLocation;
    }
    public addControl(guiControl: IGuiControl) {
        throw new Error("GuiLabel does not support adding of Control.");
    }
    public update(options: GuiLabelControlOptions) {
        const text: TextBlock = this.control.getChildByName(
            `${this.id}-Text`
        ) as TextBlock;
        text.text = options.text;
    }
    public linkWith(mesh: Mesh) {
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
export interface GuiLabelControlOptions extends IGuiControlOptions {
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
