import { Mesh } from "babylonjs";
import { TextBlock } from "babylonjs-gui";
import objectMerge from "../../../core/object/ObjectMerge";
import { IGuiControl, IGuiControlOptions, IGuiGridLocation } from "../api";
import { GuiControlType } from "../model/GuiControlType";

export class GuiText implements IGuiControl {
    public id: string;
    public options: IGuiControlOptions;
    public control: TextBlock;
    public parentId?: string;
    public gridLocation?: IGuiGridLocation;
    get type(): GuiControlType {
        return GuiControlType.TEXT;
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
        this.control = createControl(id, options as GuiTextControlOptions);
        this.gridLocation = gridLocation;
    }
    public addControl(guiControl: IGuiControl) {
        throw new Error("GuiLabel does not support adding of Control.");
    }
    public update(options: GuiTextControlOptions) {
        this.control.text = options.text;
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
    options: GuiTextControlOptions
): TextBlock => {
    return objectMerge(new TextBlock(`${idPrefix}-Text`), options);
};

export interface GuiTextControlOptions extends IGuiControlOptions {
    width: string;
    height: string;
    text: string;
    fontSize: number;
    color: string;
    alignment: 0 | 1 | 2;
    vAlignment?: 0 | 1 | 2;
    borderThickness: number;
    linkOffsetY?: number;
}
