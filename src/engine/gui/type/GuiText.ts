import { Mesh } from "babylonjs";
import { TextBlock } from "babylonjs-gui";
import objectMerge from "../../../core/object/ObjectMerge";
import {
    GuiControl,
    GuiControlOptions,
    GuiControlType,
    GuiGridLocation,
} from "../model";

export class GuiText implements GuiControl {
    public id: string;
    public options: GuiControlOptions;
    public control: TextBlock;
    public parentId?: string;
    public gridLocation?: GuiGridLocation;
    get type(): GuiControlType {
        return GuiControlType.Text;
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
        this.control = createControl(id, options as GuiTextControlOptions);
        this.gridLocation = gridLocation;
    }
    public addControl(guiControl: GuiControl) {
        throw new Error("GuiLabel does not support adding of Control.");
    }
    public update(options: GuiTextControlOptions) {
        this.control.text = options.text;
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
    options: GuiTextControlOptions
): TextBlock => {
    const text = new TextBlock(`${idPrefix}-Text`);
    text.isHitTestVisible = false;
    text.textWrapping = true;

    objectMerge(text, options);

    return text;
};
export interface GuiTextControlOptions extends GuiControlOptions {
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
