import { Mesh } from "babylonjs";
import { Control, Rectangle } from "babylonjs-gui";
import objectMerge from "../../../core/object/ObjectMerge";
import {
    GuiControl,
    GuiControlOptions,
    GuiControlType,
    GuiGridLocation,
} from "../model";

export class GuiSpacer implements GuiControl {
    public id: string;
    public options: GuiControlOptions;
    public control: Control;
    public parentId?: string;
    public gridLocation?: GuiGridLocation;
    get type(): GuiControlType {
        return GuiControlType.Spacer;
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
        this.control = createControl(options as GuiSpacerControlOptions);
        this.gridLocation = gridLocation;
    }
    public addControl(guiControl: GuiControl) {
        throw new Error("GuiSpacer does not support adding of Control.");
    }
    public update(options: GuiControlOptions) {
        throw new Error("Method not implemented.");
    }
    public linkWithMesh(mesh: Mesh) {
        this.control.linkWithMesh(mesh);
    }
    public dispose() {
        this.control.dispose();
    }
}

const createControl = (options: GuiSpacerControlOptions): Control => {
    const padding = new Rectangle();
    padding.height = `${options.padding}px`;
    padding.width = `${options.padding}px`;
    padding.thickness = 0;
    padding.isHitTestVisible = false;

    objectMerge(padding, options);

    return padding;
};

export interface GuiSpacerControlOptions extends GuiControlOptions {
    padding: number;
}
