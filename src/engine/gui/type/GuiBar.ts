import { Mesh } from "babylonjs";
import { Rectangle, TextBlock } from "babylonjs-gui";
import { isObjectDefined } from "../../../core/object/ObjectCheck";
import {
    GuiControl,
    GuiControlOptions,
    GuiControlType,
    GuiGridLocation,
} from "../model";

export class GuiBar implements GuiControl {
    public id: string;
    public options: GuiBarControlOptions;
    public control: Rectangle;
    public parentId?: string;
    public gridLocation?: GuiGridLocation;
    get type(): GuiControlType {
        return GuiControlType.Bar;
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
        this.options = options as GuiBarControlOptions;
        this.control = createControl(id, options as GuiBarControlOptions);
        this.gridLocation = gridLocation;
    }
    public addControl(guiControl: GuiControl) {
        throw new Error("GuiBar does not support adding of Control.");
    }
    public update(options: GuiBarControlOptions) {
        const percentBar = this.control.getChildByName(
            `${this.id}-PercentBar`
        ) as any;
        if (isObjectDefined(options.percent)) {
            const castedPercentBar = percentBar as any;
            castedPercentBar[
                options.barDirection || castedPercentBar.barDirection
            ] = `${options.percent}%`;
            castedPercentBar.barDirection =
                options.barDirection || castedPercentBar.barDirection;
        }

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
    options: GuiBarControlOptions
): Rectangle => {
    const background = new Rectangle(`${idPrefix}-Background`);
    background.horizontalAlignment =
        options.alignment || background.horizontalAlignment;
    background.height = `${options.height || background.height}px`;
    background.width = `${options.width || background.width}px`;
    background.background = options.backgroundColor || background.background;
    background.thickness = options.borderThickness || 0;
    background.linkOffsetY = options.linkOffsetY || 0;
    background.isHitTestVisible = false;

    const rect2 = new Rectangle(`${idPrefix}-PercentBar`);
    rect2.background = options.barColor;
    if (
        isObjectDefined(options.percent) &&
        isObjectDefined(options.barDirection)
    ) {
        (rect2 as any)[options.barDirection] = `${options.percent}%`;
        (rect2 as any).barDirection = options.barDirection;
    }
    rect2.thickness = 0;
    background.addControl(rect2);

    const text1 = new TextBlock(`${idPrefix}-Text`);
    text1.text = options.text || text1.text;
    text1.color = options.textColor || text1.color;
    text1.fontSize = options.textSize || text1.fontSize;
    background.addControl(text1);

    return background;
};

export interface GuiBarControlOptions extends GuiControlOptions {
    width: number;
    height: number;
    alignment: number;
    text: string;
    textSize: number;
    textColor: string;
    backgroundColor: string;
    barColor: string;
    barDirection: string;
    borderColor: string;
    percent: number;
    borderThickness: number;
    linkOffsetY?: number;
}
